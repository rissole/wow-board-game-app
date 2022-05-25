import styled from "styled-components";

interface Props {
  cost: number;
}

const CostBox = ({ cost }: Props) => {
  return (
    <CostBoxInner>
      <Wrapper>
        <Bolt />
      </Wrapper>
      <NumberWrapper>{cost}</NumberWrapper>
    </CostBoxInner>
  );
};

const NumberWrapper = styled.div`
  position: relative;
  line-height: 28px;
`;

const Wrapper = styled.div`
  position: absolute;
  top: 6px;
`;

const Bolt = styled.div`
  position: relative;
  top: -9px;
  left: 6px;

  opacity: 50%;
  border: 4px solid rgba(0, 0, 0, 0);
  border-bottom: 22px solid #fafa87;
  transform: rotateZ(-160deg);
  padding: 2px;
  width: 0;
  height: 0;
  margin: 0;
  overflow: visible;
  border-top: 0 solid;
  border-radius: 0;
  transform-origin: 50% 50% 0;

  &:after {
    content: "";
    top: -8px;
    left: -8px;
    border: 5px solid rgba(0, 0, 0, 0);
    border-bottom: 25px solid #fafa87;
    transform: rotateZ(4deg);
    padding: 0;
    width: 0;
    height: 0;
    position: absolute;
    margin: 0;
    overflow: visible;
    border-top: 0 solid;
    border-radius: 0;
    transform-origin: 50% 50% 0;
  }
`;

const CostBoxInner = styled.div`
  position: relative;
  background: rgb(196, 150, 217);
  color: #000000;
  width: 32px;
  height: 32px;
  text-align: center;
  border-radius: 50%;
  border: 2px outset #777777;
  font-size: 20px;
  font-weight: 700;
`;

export default CostBox;
