import { useState } from "react";
import styles from "./index.module.scss";

const PlanButtons = () => {
    const [selected, setSelected] = useState("week");
  
    return (
        <div className={styles.container}>
          <button
            className={`${styles.button} ${selected === "week" ? styles.selected : ""}`}
            onClick={() => setSelected("week")}
          >
            <div className={styles.title}>1 Week</div>
            <div className={styles.priceSmall}>$17.48</div>
            <div className={styles.priceLarge}>$2<span className={styles.priceSmall}>49</span> <span className={styles.perDay}>per day</span></div>
          </button>
          
          <button
            className={`${styles.button} ${selected === "year" ? styles.selected : ""}`}
            onClick={() => setSelected("year")}
          >
            <div className={styles.popularLabel}>MOST POPULAR</div>
            <div className={styles.title}>1 Year</div>
            <div className={styles.priceSmall}>$99.98</div>
            <div className={styles.priceLarge}>$0<span className={styles.priceSmall}>29</span> <span className={styles.perDay}>per day</span></div>
          </button>
        </div>
      );
  }

  export default PlanButtons