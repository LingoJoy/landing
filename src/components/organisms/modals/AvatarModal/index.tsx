import { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Area } from "react-easy-crop";
import { Box, Button, Divider, Stack } from "@mui/material";

import Modal from "@/components/atoms/Modal";
import ImageCropper from "../../ImageCropper";

import { getProfile, setProfile } from "@/store/profile";
import { ELocalization, ERoutes, EUrls } from "@/constants";
import { createBlob, getCroppedImg, readImageFile } from "@/utils/canvasUtils";
import axios from "@/utils/AxiosConfig";
import { User } from "@/store/auth/query";
import { getLocalization } from "@/store/localization";
import { logEvent } from "@/utils/amplitude";

import styles from "./index.module.scss";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
}

const AvatarModal: FC<IProps> = ({ isOpen, onClose }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const profile = useSelector(getProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const localization = useSelector(getLocalization);

  const fileUpload = async () => {
    if (!imageSrc) {
      return;
    }

    logEvent(`web_profile_${profile?.level}_image_on_save`);

    const file = await createBlob(imageSrc, profile?.name || "Unknown");

    try {
      const data = new FormData();
      data.append("file", file);

      const res: User = await axios.post(EUrls.USERS_PHOTO, data);

      dispatch(setProfile(res));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubmit = async () => {
    if (profile && croppedImage)
      try {
        fileUpload();
        onReset();
        onClose();
      } catch (error) {
        console.error(error);
      }
  };

  const onReset = () => {
    setImageSrc("");
    setCrop({ x: 0, y: 0 });
    setCroppedAreaPixels(null);
    setCroppedImage(null);
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = await readImageFile(file);

      setImageSrc(imageDataUrl);
      setCroppedImage(null);

      logEvent(`web_profile_${profile?.level}_image_on_upload`);
    }
  };

  const showCroppedImage = async () => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
        setCroppedImage(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      button={
        profile?._id ? (
          <Stack className={styles.resultWrapper} gap="16px">
            <Stack gap="16px">
              {imageSrc && !croppedImage ? (
                <Button
                  className={styles.outlinedBtn}
                  onClick={showCroppedImage}
                >
                  {localization[ELocalization.SHOW_RESULT]}
                </Button>
              ) : (
                <Button
                  className={styles.outlinedBtn}
                  component="label"
                  role={undefined}
                  tabIndex={-1}
                >
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
                  {imageSrc
                    ? localization[ELocalization.UPLOAD_NEW_PICTURE]
                    : localization[ELocalization.UPLOAD_PICTURE]}
                </Button>
              )}
              <Button onClick={handleSubmit} disabled={!croppedImage}>
                {localization[ELocalization.DONE_SAVE]}
              </Button>
            </Stack>
          </Stack>
        ) : (
          <></>
        )
      }
      cardClass={styles.card}
    >
      <Box className={styles.headerWrapper}>
        <h3 className={styles.title}>
          {localization[ELocalization.PROFILE_AVATAR_TITLE]}
        </h3>
      </Box>
      <Divider />
      <Box className={styles.webWrapper}>
        <Box className={styles.contentWrapper}>
          {profile?._id ? (
            <ImageCropper
              setCroppedAreaPixels={setCroppedAreaPixels}
              imageSrc={imageSrc}
              croppedImage={croppedImage}
              onFileChange={onFileChange}
              crop={crop}
              zoom={zoom}
              setCrop={setCrop}
              setZoom={setZoom}
              onReset={onReset}
            />
          ) : (
            <Button onClick={() => navigate(ERoutes.LOGIN)}>
              {localization[ELocalization.LOGIN]}
            </Button>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default AvatarModal;
