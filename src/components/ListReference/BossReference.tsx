import { useState } from "react";
import { FloatingBackButton, FullWidthListContainer } from ".";
import FullWidthImageWithBackButton from "./FullWidthImageWithBackButton";

// These are all ripped from our WoW Board Game Companion folder in Google Drive
// no idea if these links are actually stable or not but ¯\_(ツ)_/¯
const kazzak4pPath =
  "https://lh4.googleusercontent.com/6RaD95E4T3XaHElKxZXkK9tZu3AFkjBpO-CmOFG1LQVz8RGz93Y2srG1M0xiyBdJ51GmGOj8Afc1GdJfnRcD=w1387-h1295-rw";
const kelThuzad4pPath =
  "https://lh6.googleusercontent.com/GYMsf3pApAlNTsyE8H7PfV3f0SnhMNS9mY_Bl0ReBIIyYxjlB80VzadVYifX_mrWmVz_jXXBeQrkPF7viS-I=w1387-h1295-rw";
const nefarian4pPath =
  "https://lh5.googleusercontent.com/QqCsOiprfx6Ra2Kg2D1YCPHu4cdV0ydC1eo435NdDbqONfUK-OV061bQImD-yWO_saXhOF25IRMD2PIirjMz=w1387-h1295-rw";
const kazzak6pPath =
  "https://lh4.googleusercontent.com/NBKwwoA15qfJ1jokbvFORscUxMkj4TiS4b_w4Lw-YZ2ugk2OKMbSahmHE3Xc7KBBgo_gQP6kB5jmqM9y5wXx=w1387-h1295-rw";
const kelThuzad6pPath =
  "https://lh4.googleusercontent.com/H_4weGpYFTPGDv8XyQF8wkGFLOtn5HEX7LpICJrW2Y1vJgFy36PPcY_Wjk8rJJc6Pj6pU6tY6o00hpIVdvGV=w1387-h1295-rw";
const nefarian6pPath =
  "https://lh3.googleusercontent.com/kpUDeL2dUdwEEaSni-vDPcOa29-mop7CNiIm8S72VnFns03-dWQlGkVrfXuWKEjG18v2CmOQ0NXKW-rlrlxZ=w1750-h1295-rw";

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
