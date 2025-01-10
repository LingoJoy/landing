import { CSSProperties, FC } from "react";
import { Box } from "@mui/material";

import StarIcon from "@/components/atoms/icons/StarIcon";

import { IUser } from "@/constants";

import styles from "./index.module.scss";

interface ICardProps {
  data: IUser;
  commentStyle?: CSSProperties;
}

const UserCard: FC<ICardProps> = ({ data, commentStyle }) => {
  return (
    <Box className={styles.usersCard}>
      <Box className={styles.usersTitleWrapper}>
        <img src={data.image} alt="" className={styles.userPhoto} />
        <Box>
          <Box className={styles.usersNameWrapper}>
            {data.name}
            <img src={data.country} alt="" className={styles.userCountry} />
          </Box>
          <Box className={styles.usersStarsWrapper}>
            {new Array(5).fill(undefined).map((_, i) => {
              return i + 1 <= data.level ? (
                <StarIcon key={i} />
              ) : (
                <StarIcon color="#A4ABB6" key={i} />
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box className={styles.usersCommentWrapper}>
        <h4 style={commentStyle}>{data.comment}</h4>
        <p>{data.date}</p>
      </Box>
    </Box>
  );
};

export default UserCard;
