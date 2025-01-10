import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import LogoIcon from "@/components/atoms/icons/LogoIcon";

import { ERoutes } from "../../../constants";

import styles from "./index.module.scss";

const PrivacyPolicy = () => {
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
          <h1 className={styles.title}>IMPORTANT PRIVACY INFORMATION</h1>
          <strong>
            To use our service, we require you to enter your name, email, and
            answer quiz questions related to your language skills. Additionally,
            we automatically collect certain information from your device,
            including language settings, IP address, time zone, device type and
            model, device settings, operating system, Internet service provider,
            mobile carrier, hardware ID, Facebook ID, and other unique
            identifiers (such as IDFA and AAID). This data helps us to provide
            and customize our services, analyze usage patterns, and measure
            advertisements.
            <br />
            For service improvements and ad delivery, we utilize third-party
            solutions. Consequently, we may process data using services
            developed by Amazon, Apple, Amplitude, Appsflyer, Google, Firebase,
            Iterable, Stripe, PayPal, Solid, Firestorage, Zendesk, Tableau,
            Hotjar, and ironSource. Some data is stored and processed on the
            servers of these third parties, enabling us to (1) analyze various
            interactions (e.g., frequency of purchases, products viewed); (2)
            serve and measure ads (targeting specific user groups, such as those
            who have made a purchase).
            <br />
            Please review our Privacy Policy below for detailed information
            about data usage (Section 3), your data privacy rights (Section 6),
            and the data controller (Section 1). For any unanswered questions,
            contact us at{" "}
            <a
              href="mailto:work@appmediaco.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mail_link}
            >
              work@appmediaco.com
            </a>
            .
          </strong>
          <br />
          <br />
          <h1 className={styles.title}>PRIVACY POLICY</h1>
          <strong>
            This Privacy Policy outlines the collection and processing of
            personal data when you use the Words Booster mobile application (the
            “App”), Words Booster websites (the “Website”), and the services and
            products provided through them or other online services necessary
            for providing Words Booster services (collectively referred to as
            the “Service”).
            <br />
            BY USING THE SERVICE, YOU PROMISE US THAT (I) YOU HAVE READ,
            UNDERSTAND, AND AGREE TO THIS PRIVACY POLICY, AND (II) YOU ARE OVER
            16 YEARS OF AGE (OR HAVE HAD YOUR PARENT OR GUARDIAN READ AND AGREE
            TO THIS PRIVACY POLICY FOR YOU). If you do not agree or cannot make
            this promise, you must not use the Service. In such a case, you must
            (a) contact us to request deletion of your data; (b) delete the App
            from your device or leave the Website and not access or use it; and
            (c) cancel any active subscriptions or trials.
            <br />
            Any translation from the English version is provided for your
            convenience only. In the event of any difference in meaning or
            interpretation between the English language version of this Privacy
            Policy available at{" "}
            <a href="https://lingojoy.app/privacy_policy">Privacy Policy</a> and
            any translation, the English language version will prevail. The
            original English text shall be the sole legally binding version.
            <br />
            “GDPR” refers to the General Data Protection Regulation (EU)
            2016/679 of the European Parliament and the Council of 27 April 2016
            on the protection of natural persons concerning the processing of
            personal data and the free movement of such data.
            <br />
            “EEA” includes all current member states of the European Union and
            the European Free Trade Association. For this policy, EEA includes
            the United Kingdom of Great Britain and Northern Ireland.
            <br />
            “Process,” in respect of personal data, includes collecting,
            storing, and disclosing to others.
          </strong>
          <br />
          <br />
          <p className={styles.paragraph}>
            TABLE OF CONTENTS
            <br />
            1. PERSONAL DATA CONTROLLER
            <br />
            2. CATEGORIES OF PERSONAL DATA WE COLLECT <br />
            3. PURPOSES FOR PROCESSING PERSONAL DATA <br />
            4. LEGAL BASES FOR PROCESSING YOUR PERSONAL DATA (Applies only to
            EEA-based users) <br />
            5. SHARING YOUR PERSONAL DATA <br />
            6. EXERCISING YOUR PRIVACY RIGHTS
            <br />
            7. AGE LIMITATION
            <br />
            8. INTERNATIONAL DATA TRANSFERS <br />
            9. CHANGES TO THIS PRIVACY POLICY <br />
            10. DATA RETENTION <br />
            11. HANDLING “DO NOT TRACK” REQUESTS
            <br />
            12. CONTACT US
            <br />
            <br />
            1. PERSONAL DATA CONTROLLER
            <br />
            AppMedia FZE LLC, a company registered under the laws of the United
            Arab Emirates, with its office at AMC - BOULEVARD-B BUILDING, Ajman
            Media City, United Arab Emirates, will be the controller of your
            personal data. <br />
            <br />
            2. CATEGORIES OF PERSONAL DATA WE COLLECT
            <br />
            We collect data you provide voluntarily (e.g., email address and
            name). We may also receive data about you from third parties (e.g.,
            when you sign in with a third party). Additionally, we collect data
            automatically (e.g., your IP address). <br />
            2.1 Data you give us
            <br />
            We will request your email address, age range, name, timezone, phone
            number, and answers to certain quiz questions related to your
            language proficiency level, native language, learning habits, and
            grammar test results. This information is used to provide services,
            send purchase details, process payments, conduct and discuss
            tutoring sessions, and tailor our service to your needs. You may
            also provide your email when contacting our support team or
            registering in the Service. For tutoring sessions, you may provide
            additional personal data related to your language proficiency.{" "}
            <br />
            2.2 Data provided by third parties
            <br />
            When using Sign in with Apple to register an account in the Service,
            we receive data from your Apple ID account, including your name and
            email address. You can choose to share your real email address or an
            anonymous one using Apple's private email relay service. Apple
            provides detailed privacy information on the Sign in with Apple
            screen. Learn more about Sign in with{" "}
            <a href="https://www.apple.com">Apple</a>.
            <br />
            When logging in with Facebook, we receive data from your Facebook
            account, including your profile picture, name, and Facebook ID.
            Unless you opt-out on the Facebook Login screen, we will also
            collect your email address. For more information, refer to the{" "}
            <a href="https://www.facebook.com">
              Facebook Permissions Reference
            </a>{" "}
            and the{" "}
            <a href="https://www.facebook.com/policy.php">
              Facebook Data Policy
            </a>
            . Facebook allows you to control the choices you made when
            connecting your Facebook profile to the Website on their Apps and
            Websites page.
            <br />
            When logging in with Google, we receive data from your Google
            Account, including your name, email address, and profile picture.
            You can revoke access provided to us when connecting your Google
            profile to the Website on their Apps Permissions page. To learn more
            about how Google processes your data, visit its{" "}
            <Link to={ERoutes.PRIVACY_POLICY}>Privacy Policy</Link>.
            <br />
            We use Firebase Authentication service to enable authentication
            through Apple, Facebook Login, and Google Account. Learn more about{" "}
            <a href="https://firebase.google.com/support/privacy">
              Firebase's privacy and security policies
            </a>
            .
            <br />
            2.3 Data we collect automatically:
            <br />
            2.3.1 Data about how you found us
            <br />
            We gather information about the referring app or URL (i.e., the
            application or web location where you clicked on our ad).
            <br />
            2.3.2 Device and Location data
            <br />
            We collect data from your mobile device, including language
            settings, IP address, time zone, device type and model, device
            settings, operating system, Internet service provider, mobile
            carrier, hardware ID, and Facebook ID. Additionally, we track the
            ads within our Service that you interact with and the internet links
            those ads lead to.
            <br />
            2.3.3 Usage data
            <br />
            We log how you interact with our Service. For instance, we track the
            pages you view, the features and content you engage with, the
            frequency of your Service use, the duration of your sessions, and
            your purchases.
            <br />
            2.3.4 Advertising IDs
            <br />
            When you access our App or Website from a mobile device, we collect
            your Apple Identifier for Advertising (IDFA), Identifier for Vendor
            (IDFV), or Google Advertising ID (AAID), depending on your device's
            operating system. You can typically reset these identifiers through
            your device's operating system settings, although we do not control
            this functionality.
            <br />
            2.3.5 Transaction data
            <br />
            When you make payments through the Service, you need to provide
            financial account data, such as your credit card number, to our
            third-party service providers. We do not collect or store full
            credit card number data, although we may receive credit card-related
            information and transaction details, including the date, time, and
            amount of the transaction, as well as the type of payment method
            used.
            <br />
            2.3.6 Cookies
            <br />
            A cookie is a small text file stored on a user's computer for
            record-keeping purposes. Cookies can be either session cookies,
            which expire when you close your browser, or persistent cookies,
            which reBox on your hard drive for an extended period. We also use
            tracking pixels that set cookies to assist with delivering online
            advertising. Cookies help us automatically recognize you on future
            visits to our website, making it easier to navigate our Service and
            enabling certain fields to auto-fill based on previous entries.
            Cookie data is stored on your device and typically reBoxs there only
            for a limited time.
            <br />
            <br />
            3. FOR WHAT PURPOSES WE PROCESS YOUR PERSONAL DATA
            <br />
            We process your personal data for the following purposes:
            <br />
            3.1 To provide our Service
            <br />
            This involves personalizing our Service, delivering its components
            and features, and ensuring seamless use by preventing or addressing
            errors or technical issues. For example, we use your email to send
            purchase information and your name, phone number, and time zone to
            schedule and organize tutoring sessions.
            <br />
            To host personal data and enable our Service to operate and be
            distributed, we use Amazon Web Services, a hosting and backend
            service provided by Amazon.
            <br />
            We use Firebase Performance Monitoring, a service provided by
            Google, to monitor the infrastructure and performance of our
            Service. For more information, visit Google's Privacy Policy and
            Privacy and Security in Firebase.
            <br />
            We utilize Crashlytics, a monitoring service provided by Google, to
            track and analyze Service performance. For data collection policy
            details, refer to Google’s documentation.
            <br />
            To store data, we may also use Firestorage. For more information,
            review Firestorage's Privacy Policy.
            <br />
            3.2 To customize your experience
            <br />
            We process personal data such as your age range, language
            proficiency, learning habits, and goals to tailor the content of the
            Service to your preferences. For instance, we use the information
            provided during the quiz to offer the most suitable content for you,
            enabling access to programs customized to your language level and
            goals.
            <br />
            3.3 To provide you with customer support
            <br />
            We process your personal data to respond to requests for technical
            support, Service information, or other communications you initiate.
            This may involve sending you notifications or emails about Service
            performance, security updates, payment transactions, and notices
            regarding our Terms and Conditions of Use or this Privacy Policy.
            <br />
            3.4 To communicate with you regarding your use of our Service
            <br />
            We communicate with you via push notifications or emails, providing
            reminders or other information about the Service. For example, you
            may receive a push notification about a new feature in the Service.
            To opt-out of push notifications, change your device settings. To
            opt-out of emails, click the unsubscribe link in the footer of each
            email. Tutoring sessions may require communication through
            messengers and other online means.
            <br />
            The services we use for these purposes may collect data about the
            date and time when the message was viewed and any interaction with
            it, such as clicking on included links.
            <br />
            We use Apple Push Notification service (APNs) to send information to
            iOS devices. For more details, review Apple’s Privacy Policy.
            <br />
            To communicate with you, we also use Firebase Cloud Messaging and
            Firebase Notifications, services provided by Google. Firebase Cloud
            Messaging allows us to send messages and notifications to Service
            users. We integrate Firebase Notifications with Firebase Analytics
            to create analytics-based audiences and track engagement. As a
            result, we can send targeted messages to users. For more details,
            refer to Google's Privacy Policy.
            <br />
            We use Zendesk ticketing system to manage customer inquiries. When
            you contact us via the contact form or email, we store the details
            in the Zendesk system to track, prioritize, and resolve your
            requests efficiently. Review Zendesk’s Privacy Policy for more
            details.
            <br />
            We also use Iterable, a cross-channel marketing platform, to send
            in-app messages, push notifications, and emails. Review Iterable's
            Privacy Policy for more details.
            <br />
            3.5 To research and analyze your use of the Service
            <br />
            This helps us better understand our business, analyze operations,
            Boxtain, improve, innovate, plan, design, and develop the Service
            and new products. We also use this data for statistical analysis,
            testing, and improving our offers. Understanding user behavior
            allows us to enhance the Service. For example, if a feature is
            underutilized, we may focus on improving it or removing it.
            <br />
            We use ironSource for analytics and monetization services. Refer to
            ironSource's Privacy Policy for more details.
            <br />
            To understand user interaction with our Service, we use Appsflyer.
            Appsflyer helps us determine how users find us and provides various
            analytics tools for research. For more details, review Appsflyer’s
            Privacy Policy. You can opt out of Appsflyer's data collection via
            their opt-out mechanism.
            <br />
            We use Facebook Analytics to gain insights into user demographics
            and interactions with our Service. For more information, refer to
            Facebook’s Privacy Policy.
            <br />
            To track and analyze user behavior, we use Firebase Remote Config,
            an A/B testing and configuration service provided by Google. It
            helps us tailor content for users. For more details, review
            Firebase’s Privacy Policy and Privacy and Security in Firebase.
            <br />
            Amplitude is an analytics service by Amplitude Inc. We use this tool
            to understand customer interactions with our Service. Amplitude
            collects technical information such as time zone, device type, and
            unique identifiers. It helps us prioritize feature development. For
            more details, review Amplitude’s Privacy Policy.
            <br />
            We also use Firebase Analytics, a service provided by Google. For
            more information, refer to Google's partner policy and Privacy
            Policy.
            <br />
            For Service analysis, we use Tableau, which provides interactive
            data visualization products. For more details, review Tableau’s
            Privacy Policy.
            <br />
            We use Google Tag Manager to manage tags on the Website and App for
            conversion tracking and analytics.
            <br />
            To analyze visitor interactions and measure ad effectiveness, we use
            Google Analytics. Google Analytics places cookies on your device to
            provide analytics. For more information, refer to Google’s use of
            information and install the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout">
              browser plug-in available
            </a>
            .
            <br />
            We use Hotjar, a behavior analytics tool, to analyze Service use,
            providing feedback through tools such as heatmaps, session
            recordings, and surveys. For more details, refer to Hotjar’s Privacy
            Policy.
            <br />
            3.6 To send you marketing communications
            <br />
            We process your personal data for our marketing campaigns. As a
            result, you will receive information about our products, such as
            special offers or new features available on the Service. We may show
            you advertisements on our Service and send you marketing emails. If
            you do not wish to receive marketing emails, you can unsubscribe by
            following the instructions in the footer of such emails.
            <br />
            For marketing communications, we use Iterable, a cross-channel
            marketing platform that allows us to send you in-app messages, push
            notifications, and emails. Refer to Iterable's Privacy Policy for
            more details.
            <br />
            3.7 To personalize our ads
            <br />
            We and our partners use your personal data to tailor ads and
            potentially show them to you at relevant times. For example, if you
            visited our Website or installed the App, you might see ads for our
            products in your Facebook feed.
            <br />
            <br />
            How to opt-out or influence personalized advertising:
            <br />
            - iOS:
            <br />
            On your iPhone or iPad, go to Settings {" > "} Privacy {" > "} Apple
            Advertising and deselect Personalized Ads. <br />- Android:
            <br />
            To opt-out of ads on an Android device, go to Settings {" > "}{" "}
            Privacy {" > "}
            Ads and enable Opt out of Ads personalization. Additionally, you can
            reset your advertising identifier in the same section, which may
            reduce the number of personalized ads you see. For more details on
            how to control advertising choices on various devices, visit this
            link. <br />- macOS:
            <br />
            On your MacBook, disable personalized ads by going to System
            Preferences {" > "} Security & Privacy {" > "} Privacy, selecting
            Apple Advertising, and deselecting Personalized Ads. <br />-
            Windows:
            <br />
            On a Windows 10 laptop, select Start {" > "} Settings {" > "}{" "}
            Privacy and turn off the setting for "Let apps use advertising ID to
            make ads more interesting to you based on your app activity." For
            other Windows versions, follow the steps here. <br />
            To learn more about influencing advertising choices on various
            devices, visit this link.
            <br />
            You can also obtain useful information and opt-out of some
            interest-based advertising by visiting the following links:
            <br />- Network Advertising Initiative –
            <a href="http://optout.networkadvertising.org/">
              http://optout.networkadvertising.org/
            </a>
            <br />- Digital Advertising Alliance –
            <a href="http://optout.aboutads.info/">
              http://optout.aboutads.info/
            </a>
            <br />- Digital Advertising Alliance (Canada) –
            <a href="http://youradchoices.ca/choices">
              http://youradchoices.ca/choices
            </a>
            <br />- Digital Advertising Alliance (EU) –
            <a href="http://www.youronlinechoices.com/">
              http://www.youronlinechoices.com/
            </a>
            <br />- DAA AppChoices page –
            <a href="http://www.aboutads.info/appchoices/">
              http://www.aboutads.info/appchoices/
            </a>
            <br />
            <br />
            Browsers:
            <br />
            It is also possible to stop your browser from accepting cookies
            altogether by changing your browser’s cookie settings. These
            settings are usually found in the “options” or “preferences” menu of
            your browser. The following links may be helpful, or you can use the
            “Help” option in your browser: <br />- Cookie settings in Internet
            Explorer <br />- Cookie settings in Firefox <br />- Cookie settings
            in Chrome <br />- Cookie settings in Safari web and iOS
            <br />
            Google allows users to opt-out of personalized ads and prevent their
            data from being used by Google Analytics.
            <br />
            We value your right to control the ads you see. Below is a list of
            service providers we use for this purpose and how some of them allow
            you to control your ad preferences.
            <br />
            We use Facebook pixel on the Service. The Facebook pixel is a code
            placed on the Service that collects data to help us track
            conversions from Facebook ads, build targeted audiences, and
            remarket to people who have interacted with the Service (e.g., made
            a purchase).
            <br />
            We use Facebook Ads Manager to create and manage our Facebook ads.
            This tool lets us view, modify, and see results for all our Facebook
            campaigns, ad sets, and ads. Facebook users can control the types of
            ads they see on Facebook by adjusting their{" "}
            <a href="https://www.facebook.com/ads/preferences">ad settings</a>.
            <br />
            We use Facebook Audience Network SDK, an in-app advertising network
            for mobile apps, to monetize our App by displaying targeted ads that
            match user interests.
            <br />
            Google Ads is an ad delivery service provided by Google that tailors
            ads to users who have performed certain actions on our Service
            (e.g., showing ads to users who have made a purchase). For more
            information, users can opt-out of personalized ads and prevent their
            data from being used by Google Analytics.
            <br />
            We use Google AdMob, a mobile advertising platform, to generate
            revenue from our App by displaying ads in various formats.
            <br />
            3.8 To process your payments
            <br />
            We offer paid products and/or services within the Service and use
            third-party services for payment processing (e.g., payment
            processors). As a result, you can make a payment, and we will be
            notified that the payment has been made. We do not store or collect
            your payment card details; this information is provided directly to
            our third-party payment processors. For payment processing, we use
            Stripe, a payment processing provider. We also use Solid, a payment
            gateway provider. For payments, we may propose using PayPal.
            <br />
            3.9 To enforce our Terms and Conditions of Use and to prevent and
            combat fraud
            <br />
            We use personal data to enforce our agreements and contractual
            commitments and to detect, prevent, and combat fraud. As a result,
            we may share your information with others, including law enforcement
            agencies, if a dispute arises in connection with our Terms and
            Conditions of Use.
            <br />
            3.10 To comply with legal obligations
            <br />
            We may process, use, or share your data when required by law,
            particularly if requested by a law enforcement agency through
            available legal means.
            <br />
            <br />
            4. LEGAL BASES FOR PROCESSING YOUR PERSONAL DATA
            <br />
            In this section, we explain the legal bases we use for each
            processing purpose. For more information on a specific purpose,
            refer to Section 3. This section applies only to EEA-based users.
            <br />
            We process your personal data under the following legal bases:
            <br />
            4.1 Your consent
            <br />
            Under this legal basis, we send you marketing emails. You have the
            right to withdraw your consent at any time by clicking the
            unsubscribe link in the footer of our marketing emails.
            <br />
            4.2 To perform our contract with you
            <br />
            Under this legal basis, we:
            <br />
            <br />- Provide our Service (in accordance with our Terms and
            Conditions of Use) <br />- Customize your experience <br />- Provide
            you with customer support <br />- Communicate with you regarding
            your use of our Service <br />- Process your payments
            <br />
            <br />
            4.3 For our (or others') legitimate interests, unless those
            interests are overridden by your interests or fundamental rights and
            freedoms requiring protection of personal data <br />
            We rely on legitimate interests to: <br />- Communicate with you
            regarding your use of our Service, such as sending emails or push
            notifications to inform you about new products or remind you to
            complete a purchase. Our legitimate interest for this purpose is
            encouraging you to use our Service more frequently. <br />- Research
            and analyze your use of the Service, to improve our Service based on
            user preferences and feedback, making it more enjoyable and
            introducing new features. Our legitimate interest is to enhance the
            user experience. <br />- Send you marketing communications to
            promote our Service, including new products and special offers, in a
            measured and appropriate manner. Our legitimate interest is to
            market our services effectively. <br />- Personalize our ads to
            promote our Service in a targeted way. Our legitimate interest is to
            market our services efficiently. <br />- Enforce our Terms and
            Conditions of Use and prevent and combat fraud. Our legitimate
            interests are enforcing our legal rights, preventing unauthorized
            use of the Service, and ensuring compliance with our Terms and
            Conditions of Use.
            <br />
            <br />
            5. WITH WHOM WE SHARE YOUR PERSONAL DATA
            <br />
            We share information with third parties that help us operate,
            provide, improve, integrate, customize, support, and market our
            Service. Specifically, we may share certain sets of personal data
            for the purposes and with the parties indicated in Section 3 of this
            Privacy Policy. The types of third parties we share information with
            include:
            <br />
            5.1 Service providers
            <br />
            <br />
            We share personal data with third parties hired to provide services
            or perform business functions on our behalf, based on our
            instructions. These service providers include: <br />- Cloud storage
            providers (e.g., Amazon, Firestorage) <br />- Data analytics
            providers (e.g., Facebook, Firebase, Appsflyer, ironSource, Tableau,
            Google, Amplitude, Hotjar, Crashlytics)
            <br />- Communication service providers (e.g., Apple, Firebase,
            Zendesk, Iterable) <br />- Marketing partners (e.g., social media
            networks, marketing agencies, email delivery services; Facebook,
            Google) <br />- Payment service providers (e.g., Stripe, PayPal,
            Solid)
            <br />
            5.2 Law enforcement agencies and other public authorities
            <br />
            We may use and disclose personal data to enforce our Terms and
            Conditions of Use, protect our rights, privacy, safety, or property,
            and/or that of our affiliates, you, or others. Additionally, we may
            respond to requests from courts, law enforcement agencies,
            regulatory agencies, and other public and government authorities, or
            in other cases provided by law.
            <br />
            5.3 Third parties as part of a merger or acquisition
            <br />
            As we grow our business, we may buy or sell assets or business
            offerings. Customer information is typically one of the transferred
            business assets in these types of transactions. We may also share
            such information with any affiliated entity (e.g., parent company or
            subsidiary) and may transfer such information during a corporate
            transaction, such as the sale of our business, a Boxestiture,
            merger, consolidation, or asset sale, or in the unlikely event of
            bankruptcy.
            <br />
            <br />
            6. HOW YOU CAN EXERCISE YOUR PRIVACY RIGHTS
            <br />
            To manage your personal data, you have the following rights:
            <br />
            Accessing / reviewing / updating / correcting your personal data:
            You may review, edit, or change the personal data you have
            previously provided on the Service.
            <br />
            Deleting your personal data: You can request the deletion of your
            personal data as permitted by law. When you request deletion, we
            will use reasonable efforts to honor your request. In some cases, we
            may be legally required to retain some data for a specific period;
            in such instances, we will fulfill your request after complying with
            our obligations.
            <br />
            Objecting to or restricting the use of your personal data: You can
            ask us to stop using all or some of your personal data or limit our
            use of it.
            <br />
            Additional information for EEA-based users:
            <br />
            If you are based in the EEA, you have the following additional
            rights:
            <br />
            The right to lodge a complaint with a supervisory authority: While
            we would prefer you to contact us directly to address your concerns,
            you have the right to lodge a complaint with a competent data
            protection supervisory authority, particularly in the EU Member
            State where you reside, work, or where the alleged infringement
            occurred.
            <br />
            The right to data portability: If you wish to receive your personal
            data in a machine-readable format, you can send a request to us as
            described below.
            <br />
            To exercise any of your privacy rights, please send a request to
            <a
              href="mailto:work@appmediaco.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mail_link}
            >
              work@appmediaco.com
            </a>
            . <br />
            <br />
            7. AGE LIMITATION
            <br />
            We do not knowingly process personal data from persons under 16
            years of age. If you learn that someone under 16 has provided us
            with personal data, please contact us.
            <br />
            <br />
            8. INTERNATIONAL DATA TRANSFERS
            <br />
            We may transfer personal data to countries other than the one in
            which the data was originally collected to provide the Service as
            outlined in the Terms and Conditions of Use and for the purposes
            indicated in this Privacy Policy. If these countries do not have the
            same data protection laws as your home country, we deploy special
            safeguards.
            <br />
            Specifically, if we transfer personal data from the EEA to countries
            with inadequate levels of data protection, we use one of the
            following legal bases: (i) Standard Contractual Clauses approved by
            the European Commission (
            <a href="https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection/standard-contractual-clauses-scc_en">
              details available
            </a>
            ), or (ii) the European Commission’s adequacy decisions about
            certain countries (
            <a href="https://ec.europa.eu/info/law/law-topic/data-protection/international-dimension-data-protection/adequacy-decisions_en">
              details available
            </a>
            ). <br />
            <br />
            9. CHANGES TO THIS PRIVACY POLICY
            <br />
            We may modify this Privacy Policy from time to time. If we decide to
            make material changes, you will be notified by available means such
            as email, and you will have an opportunity to review the revised
            Privacy Policy. By continuing to access or use the Service after
            these changes become effective, you agree to be bound by the revised
            Privacy Policy.
            <br />
            <br />
            10. DATA RETENTION
            <br />
            We will store your personal data for as long as reasonably necessary
            to achieve the purposes set forth in this Privacy Policy (including
            providing the Service to you). We will also retain and use your
            personal data as necessary to comply with our legal obligations,
            resolve disputes, and enforce our agreements.
            <br />
            <br />
            11. HOW “DO NOT TRACK” REQUESTS ARE HANDLED
            <br />
            Various browsers (including Internet Explorer, Firefox, and Safari)
            offer a DNT option that relies on a technology known as a DNT
            header, which sends a signal to websites visited by the browser user
            about the user's DNT preference. You can usually access your
            browser's DNT option in your browser's preferences.
            <br />
            We currently do not support “Do Not Track” requests because no DNT
            standard has been adopted.
            <br />
            Our third-party services may collect information about you and your
            online activities over time and across our Services and other online
            properties. These third parties may not change their tracking
            practices in response to DNT settings in your web browser, and we do
            not obligate these parties to honor DNT settings. To determine
            whether any of the third-party services honor the “Do Not Track”
            requests, please read their privacy policies.
            <br />
            <br />
            12. CONTACT US
            <br />
            You may contact us at any time for details regarding this Privacy
            Policy and its previous versions. For any questions concerning your
            account or your personal data, please contact us at{" "}
            <a
              href="mailto:work@appmediaco.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mail_link}
            >
              work@appmediaco.com
            </a>
            .<br />
            <br />I HAVE READ THESE TERMS AND AGREE TO ALL OF THE PROVISIONS
            CONTAINED ABOVE.
            <br />
            <br />
            Effective as of: 24 September 2023
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default PrivacyPolicy;
