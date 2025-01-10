import { FC } from "react";

interface IProps {
  width?: string;
  height?: string;
  color?: string;
}

const DreamsIcon: FC<IProps> = ({
  width = "510",
  height = "486",
  color = "#B6C2FF",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 510 486"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M510 189C510 293.382 395.833 378 255 378C114.167 378 0 293.382 0 189C0 84.6182 114.167 0 255 0C395.833 0 510 84.6182 510 189ZM148 392C148 413.539 124.495 431 95.5 431C66.5051 431 43 413.539 43 392C43 370.461 66.5051 353 95.5 353C124.495 353 148 370.461 148 392ZM58 486C71.2548 486 82 477.941 82 468C82 458.059 71.2548 450 58 450C44.7452 450 34 458.059 34 468C34 477.941 44.7452 486 58 486Z"
        fill={color}
      />
    </svg>
  );
};

export default DreamsIcon;
