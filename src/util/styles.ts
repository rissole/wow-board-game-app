import styled from "styled-components";
import COLORS from "./colors";

export type ButtonStyle = "danger" | "default";

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
  [`&[disabled], &[aria-disabled="true"]`]: { opacity: "10%", filter: "grayscale(100%)" },
});

export const ActionButton = styled.button<{ buttonStyle?: ButtonStyle }>(({ buttonStyle = "default" }) => {
  const rgbMap: { [k in typeof buttonStyle]: string } = { default: "0, 150, 0", danger: "196, 0, 0" };
  return {
    padding: "12px",
    border: "1px solid black",
    borderRadius: "5px",
    fontSize: "18px",
    fontWeight: "bold",
    color: COLORS.foregroundBase,
    backgroundColor: `rgb(${rgbMap[buttonStyle]})`,
    "&:active": { filter: "brightness(0.7)" },
    [`&[disabled], &[aria-disabled="true"]`]: { opacity: "10%", filter: "grayscale(100%)" },
  };
});
