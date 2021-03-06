import styled from "styled-components";
import Button from "../../Button";

const MIN_ALLOWED_VALUE = 0;
const MAX_ALLOWED_VALUE = 99;

export interface ValueProps {
  value: number;
  onValueChange: (newValue: number) => void;
  maxValueAllowed?: number;
  minValueAllowed?: number;
  iconPath: string;
}

const ValueEdit = (props: ValueProps) => {
  const increaseValue = () => {
    props.onValueChange(props.value + 1);
  };

  const decreaseValue = () => {
    props.onValueChange(props.value - 1);
  };

  return (
    <ValueEditContainer>
      <Button isDisabled={props.value >= (props.maxValueAllowed ?? MAX_ALLOWED_VALUE)} onClick={increaseValue}>
        +
      </Button>
      <Icon path={props.iconPath}>
        {props.value}
        {props.maxValueAllowed !== undefined ? `/${props.maxValueAllowed}` : ``}
      </Icon>

      <Button isDisabled={props.value <= (props.minValueAllowed ?? MIN_ALLOWED_VALUE)} onClick={decreaseValue}>
        -
      </Button>
    </ValueEditContainer>
  );
};

const ValueEditContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: min(100%, 390px);
  font-size: 64px;
  align-items: center;
`;

const Icon = styled.div<{ path: string }>`
  background-image: url(${(props) => props.path});
  background-size: 100% 100%;
  border-radius: 10px;
  border: 2px solid black;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;
  filter: grayscale(50%);
  width: 160px;
  height: 160px;
  font-size: 80px;
  margin: 8px 0 8px;
`;

export default ValueEdit;
