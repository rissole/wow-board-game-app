import { ReactNode } from "react";
import BaseCarousel, { CarouselItem, CarouselAction } from "../BaseCarousel";

interface CarouselSingleButtonProps {
  items: CarouselItem[];
  buttonContent?: ReactNode;
  onSelect?: CarouselAction;
  onClose: () => void;
}

const CarouselSingleButton = ({ items, buttonContent = "Train", onSelect, onClose }: CarouselSingleButtonProps) => {
  const actions = [
    {
      buttonContent,
      buttonAction: onSelect,
    },
  ];
  return <BaseCarousel items={items} actions={actions} onClose={onClose} />;
};

export default CarouselSingleButton;
