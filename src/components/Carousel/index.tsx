import { ReactNode, useState } from "react";
import styled from "styled-components";

interface Props {
  renderElement: (index: number) => ReactNode;
}

export default function Carousel(props: Props) {
  const [elementCache, setElementCache] = useState<ReactNode[]>();

  return null;
}
