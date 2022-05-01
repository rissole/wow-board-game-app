import styled from "styled-components";

const MIN_ALLOWED_VALUE = 0;
const MAX_ALLOWED_VALUE = 99;

interface ModalProps {
  name: string;
  values: ValueProps[];
}

interface ValueProps {
  value: number;
  onValueChange: (newValue: number) => void;
  maxValueAllowed?: number;
  minValueAllowed?: number;
}

const NumberEditModal = (props: ModalProps) => {
  return (
    <div style={{ width: "100%", backgroundColor: "#fff" }}>
      <div style={{ textAlign: "center" }}>{props.name.toUpperCase()}</div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {props.values.map((value, i) => (
          <ValueEdit key={i} {...value} />
        ))}
      </div>
    </div>
  );
};

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
      <div style={{ textAlign: "center" }}>{props.value}</div>
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
`;

const ValueEditButton = styled.button`
  width: 100%;
  height: 72px;
  text-align: center;
  font-size: 48px;
  font-weight: bold;
`;

export default NumberEditModal;
