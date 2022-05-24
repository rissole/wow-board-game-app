import React, { useCallback, useState, ReactNode } from "react";
import styled from "styled-components";
import COLORS from "../../util/colors";

export type ButtonType = "base" | "carousel" | "action";
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

export const CarouselButton = styled(BaseButton)`
  min-width: 128px;
  height: 80px;
  font-size: 30px;
`;

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

type ButtonComponent = typeof BaseButton | typeof CarouselButton | typeof ActionButton;

const BUTTON_TYPE_TO_COMPONENT: Record<ButtonType, ButtonComponent> = {
  base: BaseButton,
  carousel: CarouselButton,
  action: ActionButton,
};

interface Props {
  onClick?: () => void;
  children: ReactNode;
  buttonProps?: { [key: string]: any };
  buttonType?: ButtonType;
  buttonStyle?: ButtonStyle;
  shouldConfirm?: boolean;
  isDisabled?: boolean;
}

const Button = ({
  onClick,
  children,
  buttonProps,
  buttonType = "base",
  buttonStyle = "default",
  shouldConfirm = false,
  isDisabled = false,
}: Props) => {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);

  const handleClick = useCallback(() => {
    if (isDisabled) {
      return;
    }

    if (!shouldConfirm) {
      onClick && onClick();
      return;
    }

    if (!isConfirming) {
      setIsConfirming(true);
    } else {
      onClick && onClick();
      setIsConfirming(false);
    }
  }, [isDisabled, shouldConfirm, isConfirming, onClick]);

  const ButtonComponent = BUTTON_TYPE_TO_COMPONENT[buttonType];
  return (
    <ButtonComponent
      aria-disabled={isDisabled}
      type="button"
      onClick={handleClick}
      buttonStyle={buttonStyle}
      {...buttonProps}
    >
      {shouldConfirm && isConfirming ? "Confirm" : children}
    </ButtonComponent>
  );
};

export default Button;
