import styled from "styled-components";
import ValueEdit, { ValueProps } from "./ValueEdit";

export interface ModalProps {
  name: string;
  values: ValueProps[];
  iconPath: string;
}

// TODO: Clean this up if we don't need to support editing multiple values in a single modal
const NumberEditModal = (props: ModalProps) => {
  return (
    <Container>
      <Title>{props.name.toUpperCase()}</Title>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {props.values.map((value, i) => (
          <ValueEdit key={i} {...value} iconPath={props.iconPath} />
        ))}
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: #fff;
  font-size: 24px;
  border-radius: 10px;
  padding: 8px;
`;

const Title = styled.h3`
  text-align: center;
  margin: 0;
  padding: 8px;
`;

export default NumberEditModal;
