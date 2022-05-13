import { useState } from "react";
import { FloatingBackButton, FullWidthListContainer } from ".";
import FullWidthImageWithBackButton from "./FullWidthImageWithBackButton";

// These are all ripped from our WoW Board Game Companion folder in Google Drive
// no idea if these links are actually stable or not but ¯\_(ツ)_/¯
const kazzak4pPath = "https://drive.google.com/uc?export=view&id=1o-Zdpx-ZMhr8mHmT77IRJNrws49LBl74";
const kelThuzad4pPath = "https://drive.google.com/uc?export=view&id=17hJkifSyWgIuwMenlbap5JmTuEr80RH0";
const nefarian4pPath = "https://drive.google.com/uc?export=view&id=1EXvKQR7SB1fuZC4PGBHyiGol7PNp59aV";
const kazzak6pPath = "https://drive.google.com/uc?export=view&id=1HYW776UxNLbLij57S7GypoeIZc93EH59";
const kelThuzad6pPath = "https://drive.google.com/uc?export=view&id=1OusyH0fKJnU-U0qBXTqs9HZ1TmlOXXjR";
const nefarian6pPath = "https://drive.google.com/uc?export=view&id=1G9Nk2II4l4zlRioLLCIb86H-NLhRt7nS";

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
