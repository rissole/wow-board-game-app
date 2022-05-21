import { DiceColor } from "../../types";
import styled from "styled-components";

interface Props {
  diceColor: DiceColor;
  numOfDice: number;
}

interface ContainerProps {
  diceColor: DiceColor;
}

const diceColorToRenderColor = {
  green: "#02a335",
  red: "#a30202",
  blue: "#4a86e8",
};

const RenderedDice = (props: Props) => {
  return (
    <Container diceColor={props.diceColor}>
      <div style={{ padding: "8px 0" }}>{props.numOfDice}</div>
    </Container>
  );
};

const Container = styled.div<ContainerProps>`
  height: 0;
  width: 36px;
  border-bottom: 32px solid ${(props) => diceColorToRenderColor[props.diceColor]};
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  text-align: center;
  font-weight: bold;
`;

export default RenderedDice;
