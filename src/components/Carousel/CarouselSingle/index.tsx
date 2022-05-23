import { ReactNode } from "react";
import BaseCarousel, { CarouselItem, CarouselAction } from "../BaseCarousel";

interface CarouselSingleProps {
  items: CarouselItem[];
  buttonContent?: ReactNode;
  onSelect?: CarouselAction;
  onClose: () => void;
}

const CarouselSingle = ({ items, buttonContent = "Train", onSelect, onClose }: CarouselSingleProps) => {
  const actions = [
    {
      buttonContent,
      buttonAction: onSelect,
    },
  ];
  return <BaseCarousel items={items} actions={actions} onClose={onClose} />;
};

export default CarouselSingle;
