import { ReactNode, useCallback, useEffect, useState } from "react";
import styled from "styled-components";

interface Props {
  renderNode: (index: number) => ReactNode;
}

type CachedNode = {
  node: ReactNode;
  index: number;
};

export default function Carousel({ renderNode }: Props) {
  const [nodeCache, setNodeCache] = useState<CachedNode[]>([]);
  const [currentIndex, _] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);

  useEffect(() => {
    const t = setInterval(() => setOffset((o) => o - 2), 50);
    return () => clearInterval(t);
  }, []);

  const getNodeFromCache = useCallback<(index: number) => CachedNode>(
    (index: number) => {
      const cachedNode = nodeCache.find((cn) => cn.index === index);
      if (cachedNode !== undefined) {
        return cachedNode;
      } else {
        const node = renderNode(index);
        setNodeCache((cache) => [...cache, { index, node }]);
        return { index, node };
      }
    },
    [nodeCache, renderNode]
  );

  const nodesToRender = Array.from({ length: 5 }).map((_, i) => getNodeFromCache(currentIndex + i));

  return (
    <div>
      {nodesToRender.map((cn, i) => {
        const origin = 40;
        const x = origin + (cn.index - currentIndex) * 225 + offset;
        const scale = 1 - Math.abs((origin - x) / 400);
        return (
          <NodeWrapper
            key={i}
            style={{
              top: "20vh",
              left: x,
              transform: `scale(${scale}, ${scale})`,
              zIndex: Math.floor(scale * 100),
            }}
          >
            {cn.node}
          </NodeWrapper>
        );
      })}
    </div>
  );
}

const NodeWrapper = styled.div({
  position: "absolute",
});
