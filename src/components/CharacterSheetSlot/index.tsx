import React from "react";
import styled from "styled-components";
import { Power, PowerType } from "../../types";
import activeSpellPath from "./active_spell_icon.jpg";
import instantSpellPath from "./instant_spell_icon.jpg";
import weaponPath from "./weapon_icon.jpg";
import Icon from "../Icon";

export interface Props {
  power?: Power;
}

const getIconPath = (powerType: PowerType) => {
  if (powerType === "active") {
    return activeSpellPath;
  } else if (powerType === "instant") {
    return instantSpellPath;
  } else {
    return weaponPath;
  }
};

const CharacterSheetSlot = (props: Props) => {
  if (props.power) {
    return (
      <Container>
        <Icon height={32} width={32} path={getIconPath(props.power.type)} />
        <div> {props.power.energyCost} </div>
        <div style={{ width: "100px" }}> {props.power.name} </div>
      </Container>
    );
  }
  return <Container />;
};

const Container = styled.div`
  background-color: #aaa;
  width: 100vw;
  height: 55px;
  border: 1px solid black;
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px;
  flex-grow: 0;
`;

export default CharacterSheetSlot;
