import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import COLORS from "../../util/colors";

const Toast = ({ durationMilliseconds = 3000, text }: { durationMilliseconds?: number; text?: React.ReactNode }) => {
  const dismissTimeout = useRef<ReturnType<typeof setTimeout>>();
  const [isTimeoutComplete, setTimeoutComplete] = useState(false);

  const dismiss = useCallback(() => {
    if (dismissTimeout.current !== undefined) {
      setTimeoutComplete(true);
      clearTimeout(dismissTimeout.current);
      dismissTimeout.current = undefined;
    }
  }, [dismissTimeout]);

  useEffect(() => {
    if (text !== undefined) {
      setTimeoutComplete(false);
      dismissTimeout.current = setTimeout(dismiss, durationMilliseconds);
      return dismiss;
    }
  }, [dismiss, dismissTimeout, durationMilliseconds, text]);

  if (text === undefined || isTimeoutComplete) {
    return null;
  }

  return (
    <Container onClick={dismiss}>
      <Content onClick={dismiss}>{text}</Content>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 8px;
  display: flex;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  z-index: 42070;
`;

const Content = styled.div({
  color: COLORS.foregroundPrimary,
  width: "80vw",
  padding: "16px",
  border: `4px solid ${COLORS.foregroundPrimary}`,
  backgroundColor: COLORS.background,
  fontSize: "18px",
});

export default Toast;
