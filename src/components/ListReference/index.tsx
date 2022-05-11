import { useState } from "react";
import styled from "styled-components";
import FullWidthImageWithBackButton from "./FullWidthImageWithBackButton";

import ListBossReference from "./BossReference";

// These are all ripped from our WoW Board Game Companion folder in Google Drive
// no idea if these links are actually stable or not but ¯\_(ツ)_/¯
const monsterReferencePath =
  "https://lh4.googleusercontent.com/LTvypj75L7QAtAFa9YC-f3AmazCun6O_uoeTU7G8Gnrx5uWzdP10OUcTs89_c-47qvIhDFJquuh9Ypaeq8Z7=w1750-h1295-rw";
const referenceSheetPath =
  "https://lh5.googleusercontent.com/D9ZxhdqLMOGnKYKkhGt7yGeYW8jMvJ0HvM_t4kLIbE9D3urRPszVEr2zqZ4bdwEu9s7toSRvdEN0FD1l6wuT=w1750-h1295-rw";
const challengeActionPath =
  "https://lh3.googleusercontent.com/eX0Dr070Xl5TJ07XcmBSlIUrdQcpX2vhvIXOJwaCN7QMa9dEvhUldI9giuToknfklcb3VfvMro4OmLtyBdzV=w1750-h1295-rw";
const creatureCombatPath =
  "https://lh5.googleusercontent.com/7TUYEfWdJ0_tuR4RPEaa0eAxGdjkUwE9YQzu4TtUyrY-WvEN5JD0PVr53nlzbWVDhB09Cf-DCENf-4XpiVBC=w1387-h1295-rw";
const pvpCombatPath =
  "https://lh3.googleusercontent.com/Qw2JE69hxpgAMgqdYxegUIimjK9OOGkoJjxTQS68_67z4yYHsAjJO7YmdsuDHQSXW05PKDWYGZmned5u83iO=w1750-h1295-rw";
const guideToFirstGamePath =
  "https://lh5.googleusercontent.com/lxeiiO3ZbPyo7WTlKqdyJCC7zCR5gvtQ2USbvToy5ki04inGycF--McY_eidUX9SW1c9ssRIjSNzsbvEGY5l=w1750-h1295-rw";

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
