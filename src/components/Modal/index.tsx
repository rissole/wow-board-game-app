import styled from "styled-components";
import React, { MouseEventHandler, ReactNode, useCallback } from "react";
import { createPortal } from "react-dom";

const MODAL_ID = "currentModal";

interface Props {
  children?: ReactNode;
  onClose?: () => void;
}

const Modal = ({ children, onClose }: Props) => {
  const onClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      if (event.target instanceof Element && event.target.id === MODAL_ID) {
        onClose && onClose();
      }
    },
    [onClose]
  );

  return createPortal(
    <Container id={MODAL_ID} onClick={onClick}>
      {children}
    </Container>,
    document.querySelector(".app") || document.body
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8px;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  z-index: 42069;
`;

export default Modal;
