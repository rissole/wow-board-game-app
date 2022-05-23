import styled from "styled-components";
import LAYOUT from "../../../util/layout";

interface TopNavItemProps {
  active?: boolean;
  className: string;
  disabled?: boolean;
  iconPath: string;
  label: string;
  onClick?: () => void;
}

const TopNavItem = (props: TopNavItemProps) => {
  return (
    <TopNavContainer
      role="link"
      aria-disabled={props.disabled ?? false}
      className={props.className}
      onClick={props.disabled ? undefined : props.onClick}
    >
      <span>{props.label}</span>
      <TopNavIcon src={props.iconPath}></TopNavIcon>
    </TopNavContainer>
  );
};

export default TopNavItem;

const TopNavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 2px;
  border-bottom: 1px solid #000000;
  width: 30vw;
  height: ${LAYOUT.navHeight}px;
  &[aria-disabled="true"] {
    filter: grayscale(100%);
  }
  white-space: nowrap;
  font-size: 12px;
  font-weight: bold;
`;

const TopNavIcon = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 4px;
`;
