import { LazyImage } from ".";
import TheFace from "../../assets/samwise.png";

interface Props {
  renderBackButton: () => JSX.Element;
  path: string;
}

const FullWidthImageWithBackButton = ({ renderBackButton, path }: Props) => {
  return (
    <>
      <LazyImage actualSrc={path} loadingSrc={TheFace} />
      {renderBackButton()}
    </>
  );
};

export default FullWidthImageWithBackButton;
