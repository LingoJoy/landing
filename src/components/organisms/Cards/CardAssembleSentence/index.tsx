import { useSelector } from "react-redux";
import { Box, Button, FormControl, Typography, Stack } from "@mui/material";

import { CardContentWrapper } from "@/components/atoms/CardWrapper";
import AudioPlayer from "../../AudioPlayer";

import audio from "@/assets/audio/test.mp3";

import { ELocalization, words } from "@/constants";
import { getLocalization } from "@/store/localization";

import { CardProps } from "@/types";

const CardAssembleSentence: React.FC<CardProps> = ({ image }) => {
  const localization = useSelector(getLocalization);

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "351px",
        textAlign: "center",
      }}
    >
      <CardContentWrapper
        cardMediaSx={{ maxHeight: 250 }}
        cardVariant="outlined"
        contentSx={{ p: 0 }}
        image={image}
      >
        <Box display="flex" justifyContent="center" alignItems="center" p={2}>
          <AudioPlayer audio={audio} border={false} />
        </Box>
      </CardContentWrapper>

      <Stack mt={3} spacing={1}>
        <Typography variant="body2" color="text.secondary">
          {localization[ELocalization.CHOOSE_WORD]}
        </Typography>
        {words.map((item, index) => (
          <FormControl key={index} fullWidth>
            <Button variant="empty">{item}</Button>
          </FormControl>
        ))}
      </Stack>
      <FormControl fullWidth>
        <Button sx={{ mt: 5 }} variant="contained" color="primary">
          {localization[ELocalization.CHECK]}
        </Button>
      </FormControl>
    </Box>
  );
};

export default CardAssembleSentence;
