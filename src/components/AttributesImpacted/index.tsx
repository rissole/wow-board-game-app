import styled from "styled-components";
import RenderedDice from "../RenderedDice";
import { AttributeImpact } from "../../types";

interface AttributeProps {
  attributesImpacted: AttributeImpact[];
}

const AttributesImpactedView = (props: AttributeProps) => {
  return (
    <AttributesContainer>
      {props.attributesImpacted
        .filter((attr) => attr.attribute.name === "dice")
        .sort()
        .map((attr, index) => {
          if (attr.attribute.name === "dice") {
            const diceAttr = attr.attribute;
            return <RenderedDice diceColor={diceAttr.diceColor} numOfDice={attr.maxImpact} key={index} />;
          }
          return undefined;
        })}
    </AttributesContainer>
  );
};

export default AttributesImpactedView;

const AttributesContainer = styled.div`
  display: flex;
  align-content: center;
  gap: 4px;
`;
