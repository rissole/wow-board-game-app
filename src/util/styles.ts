import styled from "styled-components";
import COLORS from "./colors";

export const BaseButton = styled.button({
  border: `solid 3px ${COLORS.foregroundPrimary}`,
  color: `${COLORS.foregroundPrimary}`,
  backgroundColor: `${COLORS.background}`,
  fontSize: "72px",
  height: "96px",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  appearance: "none",
  "&[disabled], &[aria-disabled]": { opacity: "10%", filter: "grayscale(100%)" },
});
