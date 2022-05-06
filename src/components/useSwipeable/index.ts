import { useCallback, useEffect, useState } from "react";

interface SwipeableConfiguration {
  swipeSensitivity?: number;
  deceleration?: number;
  offsetPerNode?: number;
}

export const DEFAULT_CONFIGURATION = {
  swipeSensitivity: 25,
  deceleration: 0.8,
  offsetPerNode: 225,
};

export const useSwipeable = (numItems: number, config: SwipeableConfiguration = {}) => {
  const configuration = { ...DEFAULT_CONFIGURATION, ...config };
  const { swipeSensitivity = 25, deceleration = 0.8, offsetPerNode } = configuration;
  const [offset, setOffset] = useState<number>(0);
  const [isMoveInProgress, setIsMoveInProgress] = useState<boolean>(false);
  const [currentX, setCurrentX] = useState<number>(0);
  const [prevMoveTime, setPrevMoveTime] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);

  const setOffsetWithinBounds = useCallback(
    (newOffset: number) => {
      const flex = offsetPerNode / 2.5;
      const minOffset = -flex;
      const maxOffset = (numItems - 1) * offsetPerNode + flex;

      if (newOffset < minOffset) {
        setOffset(minOffset);
        setVelocity(0);
      } else if (newOffset > maxOffset) {
        setOffset(maxOffset);
        setVelocity(0);
      } else {
        setOffset(newOffset);
      }
    },
    [numItems, offsetPerNode]
  );

  useEffect(() => {
    const animationInterval = setInterval(() => {
      const offsetFromPreviousNode = offset % offsetPerNode;
      const distanceToClosestNode =
        offsetFromPreviousNode < offsetPerNode / 2 ? -offsetFromPreviousNode : offsetPerNode - offsetFromPreviousNode;

      // Snap to the final position if we are close enough
      if (offset % offsetPerNode < 10 && Math.abs(velocity) < 5) {
        setVelocity(0);
        setOffsetWithinBounds(offset + distanceToClosestNode);
        return;
      }

      // Nudge the carousel towards the closest snap position
      // yeah its kinda hacky
      const boost = (distanceToClosestNode / offsetPerNode) * 10;
      const newVelocity = (velocity + boost) * deceleration;

      setVelocity(newVelocity);
      setOffsetWithinBounds(offset + newVelocity);
      return;
    }, 25);

    return () => {
      clearInterval(animationInterval);
    };
  }, [deceleration, offset, offsetPerNode, setOffsetWithinBounds, velocity]);

  const handleSwipeStart = useCallback((swipeX: number) => {
    setIsMoveInProgress(true);
    setCurrentX(swipeX);
    setPrevMoveTime(new Date().getTime());
  }, []);

  const handleSwipe = useCallback(
    (swipeX: number) => {
      if (!isMoveInProgress) return;

      const delta = currentX - swipeX;
      const elapsedTime = new Date().getTime() - prevMoveTime;
      const velocity = (delta / elapsedTime) * swipeSensitivity;

      setOffsetWithinBounds(offset + delta);
      setCurrentX(swipeX);
      setPrevMoveTime(new Date().getTime());
      setVelocity(velocity);
    },
    [currentX, isMoveInProgress, offset, prevMoveTime, setOffsetWithinBounds, swipeSensitivity]
  );

  const handleSwipeEnd = useCallback(() => {
    setIsMoveInProgress(false);
    setCurrentX(0);
  }, []);

  return {
    offset,
    velocity,
    handleSwipeStart,
    handleSwipe,
    handleSwipeEnd,
  };
};
