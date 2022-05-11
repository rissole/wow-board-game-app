import { useState } from "react";
import { FloatingBackButton, FullWidthListContainer } from ".";
import FullWidthImageWithBackButton from "./FullWidthImageWithBackButton";

const kazzak4pPath = "https://lh3.google.com/u/0/d/1o-Zdpx-ZMhr8mHmT77IRJNrws49LBl74=w1317-h1304-iv2";
const kelThuzad4pPath = "https://lh3.google.com/u/0/d/17hJkifSyWgIuwMenlbap5JmTuEr80RH0=w1317-h1304-iv2";
const nefarian4pPath = "https://lh3.google.com/u/0/d/1EXvKQR7SB1fuZC4PGBHyiGol7PNp59aV=w1317-h1304-iv2";
const kazzak6pPath = "https://lh3.google.com/u/0/d/1HYW776UxNLbLij57S7GypoeIZc93EH59=w1317-h1304-iv2";
const kelThuzad6pPath = "https://lh3.google.com/u/0/d/1OusyH0fKJnU-U0qBXTqs9HZ1TmlOXXjR=w1317-h1304-iv2";
const nefarian6pPath = "https://lh3.google.com/u/0/d/1G9Nk2II4l4zlRioLLCIb86H-NLhRt7nS=w1317-h1304-iv2";

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
