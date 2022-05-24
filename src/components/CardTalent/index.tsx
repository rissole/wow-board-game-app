import styled from "styled-components";
import COLORS from "../../util/colors";
import { Talent } from "../../types";
import Icon from "../Icon";
import { useMemo } from "react";
import { rawDescriptionToReact } from "../../util/descriptionParser";

interface Props {
  talent: Talent;
}

const CardTalent = ({ talent }: Props) => {
  const memoizedDescription = useMemo(() => rawDescriptionToReact(talent.rawDescription), [talent.rawDescription]);
  return (
    <TalentCarouselCard>
      <h1 style={{ color: COLORS.foregroundPrimary }}>{talent.name}</h1>
      <IconWrapper>
        <Icon path={talent.iconLink} width={64} />
      </IconWrapper>
      <BasicInfoContainer>
        <div>Level {talent.requiredLevel}</div>
      </BasicInfoContainer>
      <DescriptionContainer>{memoizedDescription}</DescriptionContainer>
    </TalentCarouselCard>
  );
};

const TalentCarouselCard = styled.div`
  width: 80vw;
  padding: 16px;
  height: 60vh;
  text-align: center;
  background-color: ${COLORS.background};
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

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 8px;
`;

const DescriptionContainer = styled.div`
  flex: 1;
`;

export default CardTalent;
