import styled from "styled-components";

interface Props {
  cost: number;
}

const CostBox = ({ cost }: Props) => {
  return <CostBoxInner>{cost}</CostBoxInner>;
};

const CostBoxInner = styled.div`
  background-color: #ffffff;
  color: #000000;
  width: 24px;
  height: 36px;
  text-align: center;
  padding: 6px 0;
  border-radius: 4px;
  border: 1px solid black;
  font-size: 18px;
  line-height: 22px;
`;

export default CostBox;
