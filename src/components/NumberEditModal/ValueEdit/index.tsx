import styled from "styled-components";

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
      <ValueEditButton disabled={props.value >= (props.maxValueAllowed ?? MAX_ALLOWED_VALUE)} onClick={increaseValue}>
        +
      </ValueEditButton>
      <Icon path={props.iconPath}>
        {props.value}
        {props.maxValueAllowed !== undefined ? `/${props.maxValueAllowed}` : ``}
      </Icon>

      <ValueEditButton disabled={props.value <= (props.minValueAllowed ?? MIN_ALLOWED_VALUE)} onClick={decreaseValue}>
        -
      </ValueEditButton>
    </ValueEditContainer>
  );
};

const ValueEditContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 50%;
  font-size: 64px;
`;

const ValueEditButton = styled.button`
  width: 100%;
  height: 72px;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
  border: 2px solid black;
  border-radius: 20px;
  background-color: rgb(240, 240, 240);

  &:disabled {
    color: #ccc;
    border-color: #ccc;
    background-color: rgb(240, 240, 240, 0.3);
  }
`;

const Icon = styled.div<{ path: string }>`
  background-image: url(${(props) => props.path});
  background-size: 100% 100%;
  border-radius: 20px;
  border: 2px solid black;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;
  filter: grayscale(50%);
  width: 100%;
  font-size: 80px;
  margin: 8px 0 8px;

  &:before {
    content: "";
    padding-top: 100%;
    float: left;
  }
`;

export default ValueEdit;
