import { DiceColor } from "../../types";
import styled from "styled-components";

interface Props {
  diceColor: DiceColor;
  diceColorSecondary?: DiceColor;
  numOfDice: number;
}

interface DiceProps {
  diceColor: DiceColor;
  diceColorSecondary?: DiceColor;
}

const diceColorToRenderColor = {
  green: "#02a335",
  red: "#a30202",
  blue: "#4a86e8",
};

const RenderedDice = ({ diceColor, diceColorSecondary, numOfDice }: Props) => {
  const diceColors = { diceColor, diceColorSecondary };
  return (
    <Container>
      <Trapezium {...diceColors}>{numOfDice}</Trapezium>
    </Container>
  );
};

const Trapezium = styled.div<DiceProps>`
  width: 20px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  perspective: 19px;
  transform: translateY(-5px);
  padding-top: 12px;
  font-weight: bold;
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;

  &:after {
    position: absolute;
    width: 100%;
    height: 100%;
    background: ${(props) =>
      props.diceColorSecondary
        ? `linear-gradient(90deg, ${diceColorToRenderColor[props.diceColor]} 50%, ${
            diceColorToRenderColor[props.diceColorSecondary]
          } 50%)`
        : diceColorToRenderColor[props.diceColor]};
    box-shadow: 0.1px -0.1px 1px 0.5px rgba(0, 0, 0, 0.5);
    content: "";
    left: 0;
    top: 0;
    z-index: -1;
    transform: rotateX(25deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  padding: 0 6px 0 6px;
`;

export default RenderedDice;
