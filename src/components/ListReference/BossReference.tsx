import { useState } from "react";
import { FloatingBackButton, FullWidthListContainer } from ".";
import FullWidthImageWithBackButton from "./FullWidthImageWithBackButton";

import kazzak4pPath from "../../assets/reference/kazzak4p.jpg";
import kelThuzad4pPath from "../../assets/reference/kelThuzad4p.jpg";
import nefarian4pPath from "../../assets/reference/nefarian4p.jpg";
import kazzak6pPath from "../../assets/reference/kazzak6p.jpg";
import kelThuzad6pPath from "../../assets/reference/kelThuzad6p.jpg";
import nefarian6pPath from "../../assets/reference/nefarian6p.jpg";

type Contents = "list" | "kazzak4p" | "kelThuzad4p" | "nefarian4p" | "kazzak6p" | "kelThuzad6p" | "nefarian6p";

interface Props {
  renderBackButton: () => JSX.Element;
}

const ListBossReference = ({ renderBackButton }: Props) => {
  const [contents, setContents] = useState<Contents>("list");

  const BackButton = () => <FloatingBackButton onClick={() => setContents("list")}>←</FloatingBackButton>;

  switch (contents) {
    case "kazzak4p":
      return <FullWidthImageWithBackButton renderBackButton={BackButton} path={kazzak4pPath} />;
    case "kelThuzad4p":
      return <FullWidthImageWithBackButton renderBackButton={BackButton} path={kelThuzad4pPath} />;
    case "nefarian4p":
      return <FullWidthImageWithBackButton renderBackButton={BackButton} path={nefarian4pPath} />;
    case "kazzak6p":
      return <FullWidthImageWithBackButton renderBackButton={BackButton} path={kazzak6pPath} />;
    case "kelThuzad6p":
      return <FullWidthImageWithBackButton renderBackButton={BackButton} path={kelThuzad6pPath} />;
    case "nefarian6p":
      return <FullWidthImageWithBackButton renderBackButton={BackButton} path={nefarian6pPath} />;
    case "list":
    default:
      return (
        <>
          <FullWidthListContainer onClick={() => setContents("kazzak4p")}>Kazzak (4 Player)</FullWidthListContainer>
          <FullWidthListContainer onClick={() => setContents("kelThuzad4p")}>
            Kel'Thuzad (4 Player)
          </FullWidthListContainer>
          <FullWidthListContainer onClick={() => setContents("nefarian4p")}>Nefarian (4 Player)</FullWidthListContainer>
          <FullWidthListContainer onClick={() => setContents("kazzak6p")}>Kazzak (6 Player)</FullWidthListContainer>
          <FullWidthListContainer onClick={() => setContents("kelThuzad6p")}>
            Kel'Thuzad (6 Player)
          </FullWidthListContainer>
          <FullWidthListContainer onClick={() => setContents("nefarian6p")}>Nefarian (6 Player)</FullWidthListContainer>
          {renderBackButton()}
        </>
      );
  }
};

export default ListBossReference;
