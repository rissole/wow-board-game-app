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
      aria-disabled={props.disabled ?? false}
      className={props.className}
      onClick={props.disabled ? undefined : props.onClick}
    >
      <TopNavIcon role="link" path={props.iconPath}>
        <small style={{ fontWeight: props.active ? "700" : "normal" }}>{props.label}</small>
      </TopNavIcon>
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
  &[aria-disabled="true"] {
    filter: grayscale(100%);
  }
`;

const TopNavIcon = styled.div<{ path: string }>`
  height: 48px;
  width: 48px;
  background-image: url(${(props) => props.path});
  background-size: 100% 100%;
  border-radius: 4px;
  text-shadow: -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000, -1px -1px 0 #000;
  font-size: 18px;
  filter: grayscale(50%);
`;
