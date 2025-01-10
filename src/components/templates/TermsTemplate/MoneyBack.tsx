import { useNavigate } from "react-router";
import { Box } from "@mui/material";

import LogoIcon from "@/components/atoms/icons/LogoIcon";

import { ERoutes } from "../../../constants";

import styles from "./index.module.scss";

const MoneyBack = () => {
  const navigate = useNavigate();

  return (
    <Box className={styles.app_lato}>
      <Box className={styles.header_header}>
        <span onClick={() => navigate(ERoutes.LANDING)}>
          <LogoIcon width="180" height="54" />
        </span>
      </Box>
      <Box className={styles.app_content_bg}>
        <Box className={styles.terms_and_conditions_wrapper}>
          <h1 className={styles.title}>100% Money-Back Guarantee Policy</h1>
          <p className={styles.paragraph}>
            I. MONEY-BACK GUARANTEE RULES
            <br />
            In addition to the refund rights available under applicable laws, if
            you made a purchase directly on our website and the money-back
            option was presented to you during checkout, you are eligible to
            receive a refund provided that the following conditions are met:{" "}
            <br />
            1) You contact us within 14 days of your initial purchase; and{" "}
            <br />
            2) You have followed the plan for at least 7 consecutive days within
            the first 14 days after the purchase.
            <br />
            We will review your application and notify you by email whether your
            application is approved.
            <br />
            <br />
            HOW TO DEMONSTRATE THAT YOU HAVE USED THE SERVICE
            <br />
            You can demonstrate that you have used the service by providing a
            screenshot of your app profile showing that you have been using the
            app for at least 7 consecutive days.
            <br />
            <br />
            For iOS devices:
            <br />
            1. Tap on the tab located at the lower left corner of the screen.
            This is the section of the application where all the lessons are
            listed. <br />
            2. On top, in the middle of the screen, find the number of points
            you have earned while completing the lessons. If no lessons have
            been completed, it will show “0”.
            <br />
            3. Tap on the points, and you will see the number of the streak you
            have reached. Take a screenshot of this section when the 7-day
            streak is indicated. <br />
            4. Send the required screenshot to us, and we will be glad to assist
            you further.
            <br />
            <br />
            For Android devices:
            <br />
            1. Tap on the “Profile” tab located at the lower right corner of the
            screen. The level will be shown on this “Profile” page. <br />
            2. If you have reached the 7th level, take a screenshot of this page
            and send it to us at work@appmediaco.com.
            <br />
            <br />
            IMPORTANT STATEMENT
            <br />
            Please note that only fulfilling all the above requirements will
            qualify you for a complete Voluntary Refund under the “Money-back
            guarantee”. For clarity, this “Money-back guarantee” does not apply
            to any other instances.
            <br />
            <br />
            II. GENERAL REFUND RULES
            <br />
            Generally, if you do not meet the conditions set out above, the fees
            you have paid are non-refundable and/or non-exchangeable unless
            otherwise stated herein or required by applicable law.
            <br />
            Note for EU residents: If you are an EU resident, you have the right
            to withdraw from the agreement for the purchase of digital content
            without charge and without giving any reason within fourteen (14)
            days from the date of the agreement's conclusion. The withdrawal
            right does not apply if the performance of the agreement has begun
            with your prior express consent and your acknowledgment that you
            thereby lose your right of withdrawal. YOU HEREBY EXPRESSLY CONSENT
            TO THE IMMEDIATE PERFORMANCE OF THE AGREEMENT AND ACKNOWLEDGE THAT
            YOU WILL LOSE YOUR RIGHT OF WITHDRAWAL FROM THE AGREEMENT ONCE OUR
            SERVERS VALIDATE YOUR PURCHASE AND THE APPLICABLE PURCHASE IS
            SUCCESSFULLY DELIVERED TO YOU. Therefore, you will not be eligible
            for a refund unless the digital content is defective.
            <br />
            <br />
            Last updated: 24 September 2023
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default MoneyBack;
