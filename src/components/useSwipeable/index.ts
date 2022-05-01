import { useCallback, useEffect, useState } from "react";

interface SwipeableConfiguration {
  swipeSensitivity?: number;
  deceleration?: number;
  offsetPerNode?: number;
}

export const useSwipeable = (config?: SwipeableConfiguration= {}) => {
  const { swipeSensitivity = 25, deceleration = 0.8, offsetPerNode } = config;
  const [offset, setOffset] = useState<number>(0);
  const [isMoveInProgress, setIsMoveInProgress] = useState<boolean>(false);
  const [currentX, setCurrentX] = useState<number>(0);
  const [prevMoveTime, setPrevMoveTime] = useState<number>(0);
  const [velocity, setVelocity] = useState<number>(0);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      if (velocity !== 0) {
        const newVelocity = velocity * deceleration;
        if (offsetPerNode != null) {
          const distanceToClosestNode = offset % offsetPerNode;
          console.log("# distanceToClosestNode", distanceToClosestNode);
          console.log("# offset", offset);

          setVelocity(Math.abs(newVelocity) < 1 ? 0 : newVelocity);
        } else {
          setVelocity(Math.abs(newVelocity) < 1 ? 0 : newVelocity);
        }
      }
      setOffset(offset + velocity);
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
    handleSwipeStart,
    handleSwipe,
    handleSwipeEnd,
  };
};
