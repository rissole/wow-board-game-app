import styled from "styled-components";
import {MouseEventHandler, ReactNode, useCallback} from "react";

const MODAL_ID = 'currentModal';

interface Props {
    children?: ReactNode | undefined
    onClose: () => void
}

const Modal = (props: Props) => {
    const onClick = useCallback<MouseEventHandler<HTMLDivElement>>((event) => {
        if (event.target instanceof Element && event.target.id === MODAL_ID) {
            props.onClose()
        }
    }, [props.onClose])

    return (
        <Container id={MODAL_ID} onClick={onClick}>
                {props.children}
        </Container>
    )
}

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Modal
