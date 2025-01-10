import { CardProps } from "@/types";
import { CardContent, CardMedia } from "@mui/material";

const CardSummaryNewWords: React.FC<CardProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <>
      <CardMedia image={image} title={title} />
      <CardContent>
        <h1>{title}</h1>
        <p>{description}</p>
      </CardContent>
    </>
  );
};

export default CardSummaryNewWords;
