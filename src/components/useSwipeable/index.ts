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

export const useSwipeable = (config: SwipeableConfiguration = {}) => {
  const configuration = { ...DEFAULT_CONFIGURATION, ...config };
  const { swipeSensitivity = 25, deceleration = 0.8, offsetPerNode } = configuration;
  const [offset, setOffset] = useState<number>(0);
  const [isMoveInProgress, setIsMoveInProgress] = useState<boolean>(false);
  const [currentX, setCurrentX] = useState<number>(0);
  const [prevMoveTime, setPrevMoveTime] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      const offsetFromPreviousNode = offset % offsetPerNode;
      const distanceToClosestNode =
        offsetFromPreviousNode < offsetPerNode / 2 ? -offsetFromPreviousNode : offsetPerNode - offsetFromPreviousNode;

      // Snap to the final position if we are close enough
      if (offset % offsetPerNode < 10 && Math.abs(velocity) < 5) {
        setVelocity(0);
        setOffset(offset + distanceToClosestNode);
        return;
      }

      if (velocity !== 0) {
        // Nudge the carousel towards the closest snap position
        // yeah its kinda hacky
        const boost = (distanceToClosestNode / offsetPerNode) * 10;
        const newVelocity = (velocity + boost) * deceleration;

        setVelocity(newVelocity);
        setOffset(offset + velocity);
        return;
      }
    }, 25);

    return () => {
      clearInterval(animationInterval);
    };
  }, [deceleration, offset, offsetPerNode, velocity]);

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

      setOffset(offset + delta);
      setCurrentX(swipeX);
      setPrevMoveTime(new Date().getTime());
      setVelocity(velocity);
    },
    [currentX, isMoveInProgress, offset, prevMoveTime, swipeSensitivity]
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
