import { useMemo } from "react";
import styled from "styled-components";
import { Power } from "../../types";
import COLORS from "../../util/colors";
import CostBox from "../CostBox";
import Icon from "../Icon";
import { SLOT_TYPE_TO_ICON_PATH, SLOT_TYPE_TO_COLOR } from "../SlotTypeIcons/util";
import goldCoinPath from "./goldCoin.png";
import { rawDescriptionToReact } from "./rawDescriptionToReact";

interface Props {
  power: Power;
  hiddenLabels?: ReadonlyArray<keyof Pick<Power, "goldCost">>;
}

const PowerCarouselCard = ({ power, hiddenLabels }: Props) => {
  const memoizedDescription = useMemo(() => rawDescriptionToReact(power.rawDescription), [power.rawDescription]);

  return (
    <PowerCarouselCardInner borderColor={SLOT_TYPE_TO_COLOR[power.type.primary]}>
      <h1 style={{ color: COLORS.foregroundPrimary }}>{power.name}</h1>
      <IconWrapper>
        <Icon path={power.iconLink} width={64} />
      </IconWrapper>
      <BasicInfoContainer>
        <CostBox cost={power.energyCost} />
      </BasicInfoContainer>
      <BasicInfoContainer>
        <div>Level {power.requiredLevel}</div>
        {!hiddenLabels?.includes("goldCost") ? (
          <div>
            {power.goldCost}{" "}
            <img alt="gold" src={goldCoinPath} width="16px" style={{ position: "relative", top: "2px" }} />
          </div>
        ) : null}
      </BasicInfoContainer>
      <DescriptionContainer>{memoizedDescription}</DescriptionContainer>
      <SlotTypeIconsContainer>
        <Icon path={SLOT_TYPE_TO_ICON_PATH[power.type.primary]} width={36} />
      </SlotTypeIconsContainer>
    </PowerCarouselCardInner>
  );
};

const PowerCarouselCardInner = styled.div<{ readonly borderColor?: string }>`
  width: 80vw;
  padding: 16px;
  height: 60vh;
  text-align: center;
  background-color: ${COLORS.background};
  display: flex;
  flex-flow: column nowrap;
  border-radius: 4px;
  box-shadow: 1px 1px 2px 1px ${(props) => props.borderColor ?? "rgba(0, 0, 0, 0.2)"};
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

const BasicInfoContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  padding: 8px;

  > *:not(:last-child) {
    border-right: 1px solid #222;
    padding-right: 8px;
  }
`;

const DescriptionContainer = styled.div`
  flex: 1;
`;

const SlotTypeIconsContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 4px;
  align-items: flex-start;
  padding: 8px 0 8px 8px;
  align-self: center;
`;

export default PowerCarouselCard;
