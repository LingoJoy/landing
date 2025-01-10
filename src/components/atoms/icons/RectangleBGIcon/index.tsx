import { FC } from "react";

interface IProps {
  width?: string;
  height?: string;
  color?: string;
}

const RectangleBGIcon: FC<IProps> = ({
  width = "126",
  height = "91",
  color = "#EEF3F9",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 126 91"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.38931 31.5143C-3.72919 15.9881 7.83457 0 24.1826 0H102C115.255 0 126 10.7452 126 24V67C126 80.2548 115.255 91 102 91H38.3585C27.999 91 18.8087 84.3529 15.5651 74.5143L1.38931 31.5143Z"
        fill={color}
      />
    </svg>
  );
};

export default RectangleBGIcon;
