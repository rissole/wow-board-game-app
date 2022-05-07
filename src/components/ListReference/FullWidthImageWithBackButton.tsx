import { FullWidthScrollableImage } from ".";

interface Props {
  renderBackButton: () => JSX.Element;
  path: string;
}

const FullWidthImageWithBackButton = ({ renderBackButton, path }: Props) => {
  return (
    <>
      <FullWidthScrollableImage path={path} />
      {renderBackButton()}
    </>
  );
};

export default FullWidthImageWithBackButton;
