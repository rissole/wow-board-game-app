import { toTitleCase } from "../../util/string";
import styled from "styled-components";
import ModalContent from "../Modal/ModalContent";
import ValueEdit, { ValueProps } from "./ValueEdit";
import COLORS from "../../util/colors";

export interface ModalProps {
  name: string;
  values: ValueProps[];
  iconPath: string;
}

// TODO: Clean this up if we don't need to support editing multiple values in a single modal
const NumberEditModal = (props: ModalProps) => {
  return (
    <ModalContent>
      <Title>{toTitleCase(props.name)}</Title>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {props.values.map((value, i) => (
          <ValueEdit key={i} {...value} iconPath={props.iconPath} />
        ))}
      </div>
    </ModalContent>
  );
};

const Title = styled.h3`
  text-align: center;
  margin: 0;
  padding: 8px;
  color: ${COLORS.foregroundPrimary};
`;

export default NumberEditModal;
