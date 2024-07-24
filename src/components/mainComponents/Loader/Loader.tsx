import { MainContainer } from "../../../containers";
import styles from "./index.module.css";

const Loader = () => {
  return (
    <MainContainer>
      <div className={styles.loaderWrapper}>
        <div className={styles.loader} />
      </div>
    </MainContainer>
  );
};

export default Loader;
