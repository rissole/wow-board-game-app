import React from "react";

interface Props {
  onConfirmSelection: () => void;
}

const CharacterSelectScreen = (props: Props) => {
  return (
    <>
      <div className="main">Character select placeholder</div>
      <button onClick={props.onConfirmSelection}>Confirm selection</button>
    </>
  );
};

export default CharacterSelectScreen;
