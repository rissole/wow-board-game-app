import styled, { CSSProperties } from "styled-components";

interface IconProps {
  width: CSSProperties["width"];
  height?: CSSProperties["height"];
  path: string;
  isRound?: boolean;
}

const Icon = styled.div<IconProps>((props) => ({
  width: props.width,
  height: props.height ?? props.width,
  backgroundImage: `url(${props.path})`,
  backgroundSize: "100% 100%",
  ...(props.isRound ? { borderRadius: "50%" } : {}),
}));

export default Icon;
