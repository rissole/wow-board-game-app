import { useState } from "react";
import styled from "styled-components";
import FullWidthImageWithBackButton from "./FullWidthImageWithBackButton";

import ListBossReference from "./BossReference";

// These are all ripped from our WoW Board Game Companion folder in Google Drive
// no idea if these links are actually stable or not but ¯\_(ツ)_/¯
const monsterReferencePath = "https://drive.google.com/uc?export=view&id=129JPJ3ksLFOxn_yoEv9F4pw9q4gSdFFe";
const referenceSheetPath = "https://drive.google.com/uc?export=view&id=1tSQ3hluEXYAAnSLwMPetfoVI4j1ZBwfh";
const challengeActionPath = "https://drive.google.com/uc?export=view&id=1OZ-NfN54XPINwcnpRieJskBs2wOKBNhb";
const creatureCombatPath = "https://drive.google.com/uc?export=view&id=1qb_U8dpYlfHZzuFwez3HUm-ngiK6GUxH";
const pvpCombatPath = "https://drive.google.com/uc?export=view&id=1SH0lLwb11g3JQ6OCRmB5MvKvRl1EEodo";
const guideToFirstGamePath = "https://drive.google.com/uc?export=view&id=1lIL4cNGS7yJCSXGIl6e22UnSxchw8_mc";

type Contents =
  | "list"
  | "referenceSheet"
  | "monsterReference"
  | "challengeAction"
  | "creatureCombat"
  | "pvpCombat"
  | "bossReferenceList"
  | "guideToFirstGame";

const ReferenceList = () => {
  const [contents, setContents] = useState<Contents>("list");

  const BackButton = () => <FloatingBackButton onClick={() => setContents("list")}>←</FloatingBackButton>;

  switch (contents) {
    case "referenceSheet":
      return <FullWidthImageWithBackButton renderBackButton={BackButton} path={referenceSheetPath} />;
    case "monsterReference":
      return <FullWidthImageWithBackButton renderBackButton={BackButton} path={monsterReferencePath} />;
    case "challengeAction":
      return <FullWidthImageWithBackButton renderBackButton={BackButton} path={challengeActionPath} />;
    case "creatureCombat":
      return <FullWidthImageWithBackButton renderBackButton={BackButton} path={creatureCombatPath} />;
    case "pvpCombat":
      return <FullWidthImageWithBackButton renderBackButton={BackButton} path={pvpCombatPath} />;
    case "bossReferenceList":
      return <ListBossReference renderBackButton={BackButton} />;
    case "guideToFirstGame":
      return <FullWidthImageWithBackButton renderBackButton={BackButton} path={guideToFirstGamePath} />;
    case "list":
    default:
      return (
        <>
          <FullWidthListContainer onClick={() => setContents("referenceSheet")}>Reference Sheet</FullWidthListContainer>
          <FullWidthListContainer onClick={() => setContents("monsterReference")}>
            Monster Reference Sheet
          </FullWidthListContainer>
          <FullWidthListContainer onClick={() => setContents("challengeAction")}>
            Challenge Action Example
          </FullWidthListContainer>
          <FullWidthListContainer onClick={() => setContents("creatureCombat")}>
            Creature Combat Example
          </FullWidthListContainer>
          <FullWidthListContainer onClick={() => setContents("pvpCombat")}>PvP Combat Example</FullWidthListContainer>
          <FullWidthListContainer onClick={() => setContents("bossReferenceList")}>
            Boss Reference Cards
          </FullWidthListContainer>
          <FullWidthListContainer onClick={() => setContents("guideToFirstGame")}>
            Guide to First Game
          </FullWidthListContainer>
        </>
      );
  }
};

export const FloatingBackButton = styled.div`
  position: absolute;
  height: 64px;
  width: 64px;
  color: red;
  font-size: 56px;
  line-height: 56px;
  font-weight: 900;
  text-align: center;
`;

export const FullWidthListContainer = styled.div`
  background-color: #aaa;
  width: 100vw;
  height: 55px;
  border: 1px solid black;
  display: flex;
  gap: 4px;
  padding: 8px;
`;

export const FullWidthScrollableImage = styled.div<{ path: string }>`
  background-image: url(${(props) => props.path});
  width: 100vw;
  height: 100%;
  background-position: top center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export default ReferenceList;
