import { CSSProperties, FC } from "react";

import { Star } from "../..";

import { IUser } from "../../../constants";

import styles from "./index.module.css";

interface ICardProps {
  data: IUser;
  commentStyle?: CSSProperties;
}

const UserCard: FC<ICardProps> = ({ data, commentStyle }) => {
  return (
    <div className={styles.usersCard}>
      <div className={styles.usersTitleWrapper}>
        <img src={data.image} alt="" className={styles.userPhoto} />
        <div>
          <div className={styles.usersNameWrapper}>
            {data.name}
            <img src={data.country} alt="" className={styles.userCountry} />
          </div>
          <div className={styles.usersStarsWrapper}>
            {new Array(5).fill(undefined).map((_, i) => {
              return i + 1 <= data.level ? (
                <Star key={i} />
              ) : (
                <Star color="#A4ABB6" key={i} />
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.usersCommentWrapper}>
        <h4 style={commentStyle}>{data.comment}</h4>
        <p>{data.date}</p>
      </div>
    </div>
  );
};

export default UserCard;
