import { useNavigate } from "react-router";

import Logo from "../../icons/Logo";

import { ERoutes } from "../../../constants";

import styles from "./index.module.css";

const TermsOfSubcriptions = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.app_lato}>
      <div className={styles.header_header}>
        <span onClick={() => navigate(ERoutes.START)}>
          <Logo width="180" height="54" />
        </span>
      </div>
      <main className={styles.app_content_bg}>
        <div className={styles.terms_and_conditions_wrapper}>
          <h1 className={styles.title}>SUBSCRIPTION TERMS</h1>
          <p className={styles.paragraph}>
            Trial
            <br />
            We may offer a trial subscription for the service. If you do not
            cancel at least 24 hours before the trial ends, you will
            automatically be charged the price indicated on the payment screen
            for the chosen subscription period. <br />
            <br />
            Subscription
            <br />
            The subscription will renew automatically at the end of each period
            (weekly, monthly, every 6 months, yearly, or otherwise, depending on
            the option selected at purchase) until you cancel.
            <br />
            <br />
            Payment Method
            <br />
            Payment will be charged to the payment method you provided at the
            time of purchase upon confirmation of purchase. You authorize us to
            charge the applicable fees to the payment method submitted.
            <br />
            <br />
            Cancellation
            <br />
            Canceling your subscription disables automatic renewal, but you will
            retain access to all subscription features for the remaining time of
            the current period. Note that deleting the app does not cancel your
            subscription. <br />- If you purchased a subscription or trial on
            the App Store:
            <br />
            You can cancel a trial or subscription at any time by turning off
            auto-renewal through your Apple ID account settings. To avoid
            charges, cancel the subscription in your Apple ID account settings
            at least 24 hours before the end of the trial or current
            subscription period. Only you can manage your subscriptions. Learn
            more about managing subscriptions and cancellations on Apple’s
            support page. <br />- If you purchased a subscription or trial on
            Google Play:
            <br />
            You can cancel a trial or subscription at any time by turning off
            auto-renewal through your Google Play account settings. To avoid
            charges, cancel the subscription in your account settings at least
            24 hours before the end of the trial or current subscription period.
            Only you can manage your subscriptions. Learn more about managing
            subscriptions and cancellations on Google’s support page.
            <br />- If you purchased a subscription or trial on our website:
            <br />
            You can cancel a trial or subscription by contacting us at
            work@appmediaco.com at least 24 hours before the end of the trial or
            current subscription period. <br />
            <br />
            Changes
            <br />
            To the maximum extent allowed by applicable laws, we may change
            subscription fees at any time. We will provide reasonable notice of
            any pricing changes by posting the new prices on the app and/or
            sending an email notification, or through other prominent means. If
            you do not wish to pay the new fees, you can cancel the applicable
            subscription before the change takes effect.
            <br />
            <br />
            Refunds
            <br />- If you purchased a subscription or trial on the App Store:
            <br />
            If eligible for a refund, you must request it directly from Apple.
            Follow the instructions on Apple’s support page to request a refund.{" "}
            <br />- If you purchased a subscription or trial on Google Play:
            <br />
            If eligible for a refund, you must request it directly from Google.
            Follow the instructions on Google’s support page to request a
            refund. <br />- If you purchased a subscription or trial on our
            website:
            <br />
            Please refer to our Refund Policy.
            <br />
            <br />
            For any questions regarding the subscription terms, please contact
            us at{" "}
            <a
              href="mailto:work@appmediaco.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mail_link}
            >
              work@appmediaco.com
            </a>
            .<br />
            <br />
            Consider taking a screenshot of this information for your reference
            to help manage your subscriptions.
            <br />
            <br />
            Last updated: 24 September 2023
          </p>
        </div>
      </main>
    </div>
  );
};

export default TermsOfSubcriptions;
