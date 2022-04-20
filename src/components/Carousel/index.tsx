import { ReactNode, useState } from "react";

interface Props {
  renderElement: (index: number) => ReactNode;
}

export default function Carousel({ renderElement }: Props) {
  const [elementCache, setElementCache] = useState<ReactNode[]>();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return <div>{renderElement(currentIndex)}</div>;
}
