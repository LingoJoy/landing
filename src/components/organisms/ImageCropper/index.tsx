import { ChangeEvent, FC } from "react";
import Cropper, { Area } from "react-easy-crop";

import { Box, IconButton } from "@mui/material";

import Fox from "@/assets/fox.png";
import Trash from "@/assets/trash.svg";

import styles from "./style.module.scss";

interface IProps {
  setCroppedAreaPixels: (area: Area) => void;
  imageSrc: string;
  croppedImage: string | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  crop: {
    x: number;
    y: number;
  };
  zoom: number;
  setCrop: (crop: { x: number; y: number }) => void;
  setZoom: (zoom: number) => void;
  onReset: () => void;
  type?: "rect" | "round";
}

const ImageCropper: FC<IProps> = ({
  setCroppedAreaPixels,
  imageSrc,
  croppedImage,
  onFileChange,
  crop,
  zoom,
  setCrop,
  setZoom,
  onReset,
  type = "round",
}) => {
  const onCropComplete = (_: unknown, croppedAreaPixels: Area) => {
    if (croppedAreaPixels) setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <Box className={styles.cropperWrapper}>
      <>
        {imageSrc ? (
          <Box className={styles.cropperBox}>
            {croppedImage ? (
              <Box className={styles.resultBox}>
                <img
                  src={croppedImage}
                  alt="Cropped"
                  className={styles.resultImage}
                />
                <IconButton className={styles.resultDelete} onClick={onReset}>
                  <Trash />
                </IconButton>
              </Box>
            ) : (
              <Box className={styles.cornerBox}>
                <Box className={`${styles.corner} ${styles.cornerTL}`} />
                <Box className={`${styles.corner} ${styles.cornerTR}`} />
                <Box className={`${styles.corner} ${styles.cornerBL}`} />
                <Box className={`${styles.corner} ${styles.cornerBR}`} />
                <Box className={styles.cropper}>
                  <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    showGrid={false}
                    cropShape={type}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                  />
                </Box>
              </Box>
            )}
          </Box>
        ) : (
          <label className={`${styles.label} `} role={undefined} tabIndex={-1}>
            <img src={Fox} alt="" />
            <input
              type="file"
              onChange={onFileChange}
              accept="image/jpeg, image/png"
              style={{
                clip: "rect(0 0 0 0)",
                clipPath: "inset(50%)",
                height: 1,
                overflow: "hidden",
                position: "absolute",
                bottom: 0,
                left: 0,
                whiteSpace: "nowrap",
                width: 1,
              }}
            />
          </label>
        )}
      </>
    </Box>
  );
};

export default ImageCropper;
