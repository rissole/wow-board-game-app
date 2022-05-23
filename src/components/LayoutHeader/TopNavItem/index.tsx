import styled from "styled-components";
import COLORS from "../../../util/colors";
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
      aria-disabled={props.disabled ?? false}
      className={props.className}
      onClick={props.disabled ? undefined : props.onClick}
    >
      <small style={{ fontWeight: props.active ? "700" : "normal" }}>{props.label}</small>
      <TopNavIcon src={props.iconPath} alt="The face of samwise" />
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
  height: ${LAYOUT.navHeight};
  background-color: ${COLORS.backgroundPrimary};
  &[aria-disabled="true"] {
    filter: grayscale(100%);
  }
`;

const TopNavIcon = styled.img`
  height: 48px;
  width: 48px;
  border-radius: 4px;
`;
