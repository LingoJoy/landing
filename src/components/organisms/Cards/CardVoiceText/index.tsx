import { CardContentWrapper } from "@/components/atoms/CardWrapper";
import PlayButton from "@/components/molecules/PlayButton";
import { CardProps } from "@/types";
import { Box, Typography } from "@mui/material";

const CardVoiceText: React.FC<CardProps> = ({ title, description, image }) => {
  return (
    <CardContentWrapper image={image}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography gutterBottom variant="h5" mr={1} component="div">
          {title}
        </Typography>
        <PlayButton url="" />
      </Box>
      <Typography mt={1} pb={3} variant="body2" color="text.secondary">
        {description}
      </Typography>
    </CardContentWrapper>
  );
};

export default CardVoiceText;
