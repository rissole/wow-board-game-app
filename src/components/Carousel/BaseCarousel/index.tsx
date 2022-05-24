import { ReactNode, useCallback, useMemo } from "react";
import styled from "styled-components";
import { useSwipeable, DEFAULT_CONFIGURATION } from "../../useSwipeable";
import Modal from "../../Modal";
import { UniqueCardName } from "../../../types";
import COLORS from "../../../util/colors";
import Button, { ButtonType, ButtonStyle } from "../../Button";

const OFFSET_PER_NODE = DEFAULT_CONFIGURATION.offsetPerNode;

export interface CarouselItem {
  name: UniqueCardName;
  renderNode: () => ReactNode;
}

export type CarouselAction = (item: UniqueCardName) => void;

interface CarouselButtonAction {
  buttonContent: ReactNode;
  buttonAction?: CarouselAction; // If omitted, will default to onClose action
  buttonType?: ButtonType;
  buttonStyle?: ButtonStyle;
  shouldConfirm?: boolean;
}

interface Props {
  items: CarouselItem[];
  actions: CarouselButtonAction[];
  onClose: () => void;
}

export default function Carousel({ items, onClose, actions }: Props) {
  const { offset, handleSwipeStart, handleSwipe, handleSwipeEnd } = useSwipeable(items.length, {
    offsetPerNode: OFFSET_PER_NODE,
  });

  const currentItemIndex = useMemo(() => Math.round(offset / OFFSET_PER_NODE), [offset]);

  const onTouchStart = useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      // don't allow swiping for a single item
      if (items.length <= 1) {
        return;
      }
      handleSwipeStart("targetTouches" in event ? event.targetTouches[0]!.clientX : event.clientX);
    },
    [handleSwipeStart, items.length]
  );

  const onTouchMove = useCallback(
    (event: React.TouchEvent | React.MouseEvent) => {
      handleSwipe("targetTouches" in event ? event.targetTouches[0]!.clientX : event.clientX);
    },
    [handleSwipe]
  );

  const onButtonClick = useCallback(
    (action?: CarouselAction) => {
      const currentItem = items[currentItemIndex];
      if (currentItem !== undefined) {
        if (action) {
          action(currentItem.name);
        } else {
          onClose();
        }
      }
    },
    [currentItemIndex, items, onClose]
  );

  return (
    <Modal>
      <CarouselContainer
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={handleSwipeEnd}
        onMouseDown={onTouchStart}
        onMouseMove={onTouchMove}
        onMouseUp={handleSwipeEnd}
      >
        <div>
          <CarouselCloseButton role="button" onClick={onClose} />
        </div>
        <CarouselMain>
          {items.length ? (
            items.map((item, index) => {
              const x = index * OFFSET_PER_NODE - offset;
              const scale = 1 - Math.abs(x / 400);

              if (scale < 0) {
                return null;
              }

              return (
                <NodeWrapper
                  key={index}
                  style={{
                    top: "10vh",
                    left: `calc(${x}px + 10vw)`,
                    transform: `scale(${scale}, ${scale})`,
                    zIndex: Math.floor(scale * 100),
                  }}
                >
                  {item.renderNode()}
                </NodeWrapper>
              );
            })
          ) : (
            <EmptyCarouselCard onClick={onClose}>
              <h1>No valid items</h1>
            </EmptyCarouselCard>
          )}
        </CarouselMain>
        <CarouselFooter>
          {items.length &&
            actions.map(({ buttonContent, buttonAction, buttonType = "carousel", buttonStyle, shouldConfirm }) => (
              <Button
                onClick={() => onButtonClick(buttonAction)}
                buttonType={buttonType}
                buttonStyle={buttonStyle}
                shouldConfirm={shouldConfirm}
              >
                {buttonContent}
              </Button>
            ))}
        </CarouselFooter>

        <div>{/* TODO: Show the name of the current card */}</div>
      </CarouselContainer>
    </Modal>
  );
}

const NodeWrapper = styled.div({
  position: "absolute",
});

const EmptyCarouselCard = styled(NodeWrapper)`
  top: 10vh;
  left: 10vw;
  width: 80vw;
  padding: 48px 16px 16px;
  height: 60vh;
  text-align: center;
  background-color: ${COLORS.background};
  color: ${COLORS.foregroundBase};
  display: flex;
  justify-content: center;
`;

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CarouselMain = styled.div`
  width: 100vw;
  height: 60vh;
`;

const CarouselFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px 32px 0 32px;
  gap: 20px;
  width: 100%;
`;

const CarouselCloseButton = styled.div`
  position: absolute;
  width: 48px;
  height: 48px;
  top: 0;
  right: 4px;
  margin-top: -20px;
  &:before {
    content: "\\00d7";
    font-size: 64px;
    opacity: 0.7;
  }
`;
