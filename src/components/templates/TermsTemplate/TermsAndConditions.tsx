import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

import LogoIcon from "@/components/atoms/icons/LogoIcon";

import { ERoutes } from "../../../constants";

import styles from "./index.module.scss";

const TermsAndConditions = () => {
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
          <h1 className={styles.title}>Terms And Conditions of Use</h1>
          <strong>
            THIS SERVICE INCLUDES SUBSCRIPTIONS THAT RENEW AUTOMATICALLY. PLEASE
            CAREFULLY READ THESE TERMS AND CONDITIONS OF USE (ESPECIALLY SECTION
            5 "SUBSCRIPTION FEES AND PAYMENT") BEFORE BEGINNING A TRIAL OR
            COMPLETING A PURCHASE FOR OUR AUTO-RENEWING SUBSCRIPTION SERVICE. TO
            AVOID BEING CHARGED, YOU MUST CANCEL A SUBSCRIPTION OR FREE TRIAL AT
            LEAST 24 HOURS BEFORE THE END OF THE TRIAL OR CURRENT SUBSCRIPTION
            PERIOD. <br />
            IF YOU ARE UNSURE HOW TO CANCEL A SUBSCRIPTION OR TRIAL, PLEASE
            REFER TO OUR SUBSCRIPTION TERMS. CONSIDER TAKING A SCREENSHOT OF
            THIS INFORMATION FOR FUTURE REFERENCE.
          </strong>
          <br />
          <br />
          <p className={styles.paragraph}>
            1. AGREEMENT TO TERMS
            <br />
            1.1. The LingoJoy app , accessible at:{" "}
            <Link to={ERoutes.TERMS}>Terms and Conditions</Link> along with the
            content available through the Website or our emails (collectively,
            "Content"), is distributed by AppMedia FZE LLC, a company registered
            under the laws of the United Arab Emirates, with its mailing address
            at AMC - BOULEVARD-B BUILDING, Ajman Media City, United Arab
            Emirates ("we," "us," "our," or the "Company"). The Website,
            combined with the Content, tools, transactions, and other services
            accessible via the Website, are collectively known as the "Service."
            <br />
            1.2. By accessing and using the Service, you agree to be bound by
            these Terms and Conditions of Use (the "Terms"), which form a
            legally binding agreement between you and the Company. Therefore,
            PLEASE READ THE TERMS CAREFULLY BEFORE USING THE SERVICE.
            <br />
            1.3. Please also review our{" "}
            <Link to={ERoutes.PRIVACY_POLICY}>Privacy Policy</Link>. The terms
            of the Privacy Policy and any additional terms, policies, or
            documents that may be posted on the Service from time to time are
            hereby expressly incorporated by reference. We reserve the right, at
            our sole discretion, to modify these Terms at any time and for any
            reason.
            <br />
            1.4. Unless otherwise explicitly stated, we will notify you about
            any changes by updating the "Last updated" date of these Terms, and
            you waive any right to receive specific notice of each such change.
            <br />
            1.5. THESE TERMS INCLUDE IMPORTANT DISCLAIMERS (SECTION 2),
            WARRANTIES DISCLAIMERS (SECTION 8), LIMITATION OF LIABILITY (SECTION
            9), AND PROVISIONS THAT WAIVE YOUR RIGHT TO A JURY TRIAL, COURT
            HEARING, AND PARTICIPATION IN A CLASS ACTION (ARBITRATION AND CLASS
            ACTION WAIVER). UNLESS YOU OPT OUT WITHIN 30 DAYS OF FIRST USE OF
            OUR SERVICE AS PROVIDED IN SECTION 12, ARBITRATION IS THE EXCLUSIVE
            REMEDY FOR ALL DISPUTES AND IS MANDATORY EXCEPT AS SPECIFIED BELOW
            IN SECTION 12.
            <br />
            1.6. IF YOU DO NOT AGREE WITH ANY PART OF THESE TERMS, OR IF YOU ARE
            NOT ELIGIBLE OR AUTHORIZED TO BE BOUND BY THESE TERMS, THEN DO NOT
            ACCESS OR USE THE WEBSITE AND THE SERVICE. I HAVE READ THESE TERMS
            AND AGREE TO ALL OF THE PROVISIONS CONTAINED ABOVE.
            <br />
            <br />
            2. IMPORTANT DISCLAIMERS
            <br />
            2.1. WE DO NOT GUARANTEE THAT (I) THE SERVICE WILL MEET YOUR
            EXPECTATIONS, (II) THE SERVICE WILL BE CONTINUOUS, TIMELY, SECURE,
            OR FREE OF ERRORS, (III) THE RESULTS YOU MAY ACHIEVE FROM USING THE
            SERVICE WILL BE ACCURATE OR RELIABLE, OR (IV) THE QUALITY OF ANY
            PRODUCTS, SERVICES, INFORMATION, OR OTHER MATERIALS PURCHASED OR
            OBTAINED THROUGH THE SERVICE WILL MEET YOUR EXPECTATIONS OR BE
            BENEFICIAL.
            <br />
            2.2. WE ALSO DO NOT GUARANTEE ANY SPECIFIC LEVEL OF SUCCESS YOU MAY
            EXPERIENCE DURING YOUR LEARNING PROCESS, AND YOU ACKNOWLEDGE THAT
            RESULTS WILL VARY FOR EACH INBoxIDUAL. TESTIMONIALS AND EXAMPLES
            PROVIDED ON THE SERVICE ARE EXCEPTIONAL CASES AND ARE NOT INTENDED
            TO REPRESENT OR GUARANTEE THAT ANYONE WILL ACHIEVE THE SAME OR
            SIMILAR RESULTS.
            <br />
            <br />
            3. USE OF SERVICE
            <br />
            3.1. The Service offers users the ability to purchase personalized
            learning courses in PDF format or through our mobile application
            (the "Purchase"). To complete a Purchase, you will be required to
            provide certain information about yourself. <br />
            3.2. By using the Service, you represent and warrant to the Company
            that: (i) all information you provide is truthful and accurate; (ii)
            your use of the Service does not violate any applicable laws or
            regulations or these Terms. Failure to provide accurate information
            may hinder our ability to personalize the services correctly.
            <br />
            3.3. The Service is not intended for use by inBoxiduals under the
            age of 16. You represent and warrant to the Company that you meet
            this age requirement. Users who are minors in their jurisdiction
            (generally under the age of 18) must have the consent and direct
            supervision of a parent or guardian to use the Service. If you are a
            minor, your parent or guardian must read and agree to these Terms
            before you use the Service.
            <br />
            3.4. The Company reserves the right to suspend or terminate your use
            of the Service, or access to it, with or without notice, if you
            breach these Terms. <br />
            3.5. By using the Service, you agree to receive communications and
            updates about the Service from the Company. You can opt-out of
            non-essential communications by unsubscribing from email
            notifications. <br />
            3.6. The Service may be modified, updated, interrupted, or suspended
            at any time without notice or liability. <br />
            3.7. You are responsible for obtaining the necessary equipment and
            telecommunication services to access the Service, and for all
            associated fees (such as computing devices and Internet service
            provider and airtime charges). <br />
            3.8. Your access to and use of the Service is at your own risk. The
            Company is not responsible for any harm to your computing system,
            loss of data, or other harm to you or any third party, including,
            but not limited to, bodily harm, resulting from your use of the
            Service or reliance on any information or advice. <br />
            3.9. The Company is not obligated to provide customer support.
            However, the Company may offer customer support at its discretion.
            <br />
            <br />
            4. INTELLECTUAL PROPERTY
            <br />
            4.1. You recognize that all text, images, trademarks, logos,
            compilations (meaning the collection, arrangement, and assembly of
            information), data, other content, software, and materials displayed
            on the Service or used by the Company to operate the Service
            (including the Website and Content, excluding any User Content (as
            defined below)) are proprietary to us or to third parties. <br />
            4.2. The Company expressly reserves all rights, including all
            intellectual property rights, in the aforementioned content. Except
            as explicitly permitted by these Terms, any use, redistribution,
            sale, decompilation, reverse engineering, disassembly, translation,
            or other exploitation of these materials is strictly prohibited.
            Providing the Service does not transfer any rights, title, or
            interest in these intellectual property rights to you or any third
            party. <br />
            4.3. The information you submit to us, as well as any data, text,
            and other materials you may submit to the Website ("User Content"),
            reBox your intellectual property. The Company does not claim
            ownership of the copyright or other proprietary rights in such
            registration information and User Content. However, you agree that
            the Company may retain copies of the User Content and use it as
            reasonably necessary for the operation of the Service and as
            described in these Terms and the
            <Link to={ERoutes.PRIVACY_POLICY}>Privacy Policy</Link>.<br />
            4.4. You grant the Company a non-exclusive, worldwide, transferable,
            perpetual, irrevocable right to publish, distribute, publicly
            display, and perform the User Content in connection with the
            Service.
            <br />
            4.5. Under these Terms, the Company provides you with a
            non-transferable, non-exclusive license (without the right to
            sublicense) to use the Website and the Service exclusively for your
            personal, non-commercial use. <br />
            4.6. You agree, represent, and warrant that your use of the Service,
            or any part thereof, will comply with the aforementioned license,
            covenants, and restrictions and will not infringe or violate the
            rights of any other party or breach any contract or legal duty to
            any other parties. Additionally, you agree to comply with all
            applicable laws, regulations, and ordinances related to the Service
            or your use of it, and you will be solely responsible for any
            violations of such laws. <br />
            4.7. The Service may contain links to third-party websites or
            resources and advertisements for third parties (collectively, "Third
            Party Ads"). These Third Party Ads are not under the Company's
            control, and the Company is not responsible for any Third Party Ads.
            The Company provides these Third Party Ads only as a convenience and
            does not review, approve, monitor, endorse, warrant, or make any
            representations with respect to Third Party Ads. Advertisements and
            other information provided by Third Party Sites Ads may not be
            wholly accurate. You acknowledge sole responsibility for and assume
            all risk arising from your use of any such websites or resources.
            When you link to a third-party site, the applicable service
            provider's terms and policies, including privacy and data gathering
            practices, govern. You should conduct any investigation you feel
            necessary or appropriate before proceeding with any transaction with
            any third party. Your transactions and other dealings with Third
            Party Ads that are found on or through the Website, including
            payment and delivery of related goods or services, are solely
            between you and such merchant or advertiser. <br />
            4.8. You hereby release us, our officers, employees, agents, and
            successors from claims, demands, any and all losses, damages,
            rights, claims, and actions of any kind, including personal
            injuries, death, and property damage, that are either directly or
            indirectly related to or arise from any interactions with or conduct
            of any Service users, or any Third Party Ads.
            <br />
            <br />
            5. FEES AND PAYMENT
            <br />
            5.1. The Service allows users to purchase personalized learning
            courses either by (1) paying a subscription fee in advance on a
            recurring interval disclosed to you prior to your purchase; or (2)
            pre-paying for access to the Service for a specific period
            (collectively referred to as "Purchase"). <br />
            5.2. To the fullest extent allowed by law, we reserve the right to
            change Purchase fees at any time. We will provide you with
            reasonable notice of any pricing changes by posting the new prices
            on the Service, sending you an email notification, or through other
            prominent means. If you do not wish to pay the new fees, you may
            cancel the relevant subscription before the new rates take effect.
            <br />
            5.3. You authorize us to charge the applicable fees to the payment
            card you submit. <br />
            5.4. By subscribing to certain subscriptions, you agree that your
            subscription may automatically renew. Unless you cancel your
            subscription, you authorize us to charge you for the renewal term.
            The auto-renewal period will match your initial subscription period
            unless otherwise specified on the Service. The renewal rate will not
            exceed the rate for the previous subscription period, excluding any
            promotional and discount pricing, unless we notify you of a rate
            change before your auto-renewal. You must cancel your subscription
            according to the disclosed cancellation procedures for that specific
            subscription. We do not offer refunds for any fees that may have
            accrued to your account and do not prorate fees for canceled
            subscriptions. <br />
            5.5. We may offer a trial subscription to the Service, providing you
            access for a specified period, with details outlined when you sign
            up for the offer. Unless you cancel before the end of the trial, or
            unless stated otherwise, your access to the Service will continue
            automatically, and you will be billed the applicable fees. It is
            your responsibility to know when the trial ends. We reserve the
            right, at our sole discretion, to modify or terminate any trial
            offer, your access to the Service during the trial, or any of these
            terms without notice and without liability. We also reserve the
            right to limit your ability to take advantage of multiple trials.{" "}
            <br />
            5.6. Your rights to use the Service expire at the end of the paid
            period of your subscription. If you fail to pay the fees or charges
            due, we may make reasonable efforts to notify you and resolve the
            issue; however, we reserve the right to disable or terminate your
            access to the Service without notice. <br />
            5.7. Except as required by law, the Company does not provide refunds
            for any transactions once they have been made. By making a Purchase,
            you acknowledge and agree that all Purchases are non-refundable and
            non-exchangeable. <br />
            Note for EU residents: <br />
            If you are an EU user, you have the right to withdraw from the
            service agreement and agreement for digital content without charge
            and without giving any reason within fourteen (14) days from the
            date of the agreement's conclusion. The withdrawal right does not
            apply if the performance of the agreement has begun with your prior
            express consent and your acknowledgment that you thereby lose your
            right of withdrawal. YOU HEREBY EXPRESSLY CONSENT TO THE IMMEDIATE
            PERFORMANCE OF THE AGREEMENT AND ACKNOWLEDGE THAT YOU WILL LOSE YOUR
            RIGHT OF WITHDRAWAL FROM THE AGREEMENT ONCE OUR SERVERS VALIDATE
            YOUR PURCHASE AND THE APPLICABLE PURCHASE IS SUCCESSFULLY DELIVERED
            TO YOU.
            <br />
            <br />
            6. DIGITAL CONTENT LICENSE
            <br />
            6.1. If you purchase Digital Content, we grant you a single-seat,
            non-exclusive, non-transferable right to download and use the
            Digital Content for personal, non-commercial purposes. <br />
            6.2. You may not: (i) use Digital Content for commercial purposes,
            including in any advertising, merchandise, or other commercial
            contexts; (ii) resell, rent, loan, give, sublicense, redistribute,
            provide access to, share, or otherwise transfer any Digital Content
            or the right to use it; (iii) use Digital Content as a trademark,
            logo, service mark, or other indication of origin; (iv) falsely
            represent that you created the Digital Content; (v) modify the
            Digital Content.
            <br />
            <br />
            7. USER REPRESENTATIONS AND RESTRICTIONS
            <br />
            7.1. By using the Service, you represent and warrant that: <br />
            7.1.1. You have the legal capacity and agree to comply with these
            Terms; <br />
            7.1.2. You are not under the age of 16; <br />
            7.1.3. You will not access the Service through automated or
            non-human means, whether through a bot, script, or otherwise; <br />
            7.1.4. You will not use the Service for any illegal or unauthorized
            purpose; <br />
            7.1.5. You are not located in a country subject to a U.S. government
            embargo or designated by the U.S. government as a "terrorist
            supporting" country;
            <br />
            7.1.6. You are not listed on any U.S. government list of prohibited
            or restricted parties; and <br />
            7.1.7. Your use of the Service will not violate any applicable law
            or regulation.
            <br />
            7.2. If you provide any information that is untrue, inaccurate, not
            current, or incomplete, we have the right to refuse any and all
            current or future use of the Service (or any portion thereof).{" "}
            <br />
            7.3. You may not access or use the Service for any purpose other
            than that for which we make the Service available. The Service may
            not be used in connection with any commercial endeavors except those
            specifically endorsed or approved by us. <br />
            7.4. As a user of the Service, you agree not to: <br />
            7.4.1. Systematically retrieve data or other content from the
            Service to create or compile, directly or indirectly, a collection,
            compilation, database, or directory without written permission from
            us; <br />
            7.4.2. Make any unauthorized use of the Service; <br />
            7.4.3. Make any modification, adaptation, improvement, enhancement,
            translation, or derivative work from the Service; <br />
            7.4.4. Use the Service for any revenue-generating endeavor,
            commercial enterprise, or other purpose for which it is not designed
            or intended; <br />
            7.4.5. Make the Service available over a network or other
            environment permitting access or use by multiple devices or users at
            the same time; <br />
            7.4.6. Use the Service to create a product, service, or software
            that is, directly or indirectly, competitive with or in any way a
            substitute for the Service; <br />
            7.4.7. Use any proprietary information or any of our interfaces or
            other intellectual property in the design, development, manufacture,
            licensing, or distribution of any applications, accessories, or
            devices for use with the Service; <br />
            7.4.8. Circumvent, disable, or otherwise interfere with
            security-related features of the Service;
            <br />
            7.4.9. Engage in unauthorized framing of or linking to the Service;{" "}
            <br />
            7.4.10. Interfere with, disrupt, or create an undue burden on the
            Service or the networks or services connected to the Service; <br />
            7.4.11. Decipher, decompile, disassemble, or reverse engineer any of
            the software comprising or in any way making up a part of the
            Service; <br />
            7.4.12. Attempt to bypass any measures of the Service designed to
            prevent or restrict access to the Service or any portion of the
            Service; <br />
            7.4.13. Upload or distribute in any way files that contain viruses,
            worms, trojans, corrupted files, or any other similar software or
            programs that may damage the operation of another's computer;
            <br />
            7.4.14. Use, launch, develop, or distribute any automated system,
            including without limitation, any spider, robot, cheat utility,
            scraper, or offline reader that accesses the Service, or use or
            launch any unauthorized script or other software;
            <br />
            7.4.15. Use the Service to send automated queries to any website or
            to send any unsolicited commercial e-mail;
            <br />
            7.4.16. Disparage, tarnish, or otherwise harm, in our opinion, us
            and/or the Service; <br />
            7.4.17. Use the Service in a manner inconsistent with any applicable
            laws or regulations; or
            <br />
            7.4.18. Otherwise infringe these Terms.
            <br />
            <br />
            8. DISCLAIMER OF WARRANTIES
            <br />
            THE WEBSITE, DIGITAL CONTENT, AND OTHER ASPECTS OF THE SERVICE ARE
            PROVIDED "AS IS" AND "AS AVAILABLE." THE WEBSITE, DIGITAL CONTENT,
            AND OTHER ASPECTS OF THE SERVICE ARE PROVIDED WITHOUT REPRESENTATION
            OR WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING, BUT NOT
            LIMITED TO, THE IMPLIED WARRANTIES OF TITLE, NON-INFRINGEMENT,
            INTEGRATION, MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE,
            AND ANY WARRANTIES IMPLIED BY ANY COURSE OF PERFORMANCE OR USAGE OF
            TRADE, ALL OF WHICH ARE EXPRESSLY DISCLAIMED. THE COMPANY AND ITS
            AFFILIATES, LICENSORS, AND SUPPLIERS DO NOT WARRANT THAT: (I) THE
            SERVICE, DIGITAL CONTENT, OR OTHER INFORMATION WILL BE TIMELY,
            ACCURATE, RELIABLE, OR CORRECT; (II) THE SERVICE WILL BE SECURE OR
            AVAILABLE AT ANY PARTICULAR TIME OR PLACE; (III) ANY DEFECTS OR
            ERRORS WILL BE CORRECTED; (IV) THE SERVICE WILL BE FREE OF VIRUSES
            OR OTHER HARMFUL COMPONENTS; OR (V) ANY RESULT OR OUTCOME CAN BE
            ACHIEVED.
            <br />
            <br />
            9. LIMITATION OF LIABILITY
            <br />
            9.1. UNDER NO CIRCUMSTANCES SHALL WE (AND OUR AFFILIATES) BE LIABLE
            TO YOU OR ANY THIRD PARTY FOR ANY LOST PROFITS OR ANY INDIRECT,
            CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES
            ARISING FROM THESE TERMS OR YOUR USE OF, OR INABILITY TO USE, THE
            SERVICE (INCLUDING THE WEBSITE OR CONTENT), OR THIRD-PARTY ADS, EVEN
            IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ACCESS
            TO, AND USE OF, THE SERVICE (INCLUDING THE WEBSITE, CONTENT, AND
            USER CONTENT), AND THIRD-PARTY ADS ARE AT YOUR OWN DISCRETION AND
            RISK, AND YOU WILL BE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR
            COMPUTING SYSTEM OR LOSS OF DATA RESULTING THEREFROM. <br />
            9.2. NOTWITHSTANDING ANYTHING TO THE CONTRARY HEREIN, YOU AGREE THAT
            THE TOTAL LIABILITY OF THE COMPANY TO YOU FOR ANY AND ALL CLAIMS
            ARISING FROM THE USE OF THE WEBSITE, CONTENT, OR SERVICE IS LIMITED
            TO THE AMOUNTS YOU HAVE PAID TO THE COMPANY FOR THE SERVICE. THE
            LIMITATIONS OF DAMAGES SET FORTH ABOVE ARE FUNDAMENTAL ELEMENTS OF
            THE BASIS OF THE TERMS BETWEEN THE COMPANY AND YOU. <br />
            9.3. SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF
            LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE
            LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU AND YOU MAY ALSO HAVE
            OTHER LEGAL RIGHTS THAT VARY FROM JURISDICTION TO JURISDICTION.
            <br />
            <br />
            10. INDEMNITY
            <br />
            You agree to indemnify and hold the Company, its successors,
            subsidiaries, affiliates, related companies, suppliers, licensors,
            and partners, and the officers, directors, employees, agents, and
            representatives of each of them harmless, including costs and
            attorneys' fees, from any claim or demand made by any third party
            due to or arising out of (i) your use of the Service, (ii) your User
            Content, or (iii) your violation of these Terms. The Company
            reserves the right, at your expense, to assume the exclusive defense
            and control of any matter for which you are required to indemnify us
            and you agree to cooperate with our defense of these claims. You
            agree not to settle any matter without the prior written consent of
            the Company. The Company will use reasonable efforts to notify you
            of any such claim, action, or proceeding upon becoming aware of it.
            <br />
            <br />
            11. INTERNATIONAL USE
            <br />
            The Company makes no representation that the Service is accessible,
            appropriate, or legally available for use in your jurisdiction, and
            accessing and using the Service is prohibited from territories where
            doing so would be illegal. You access the Service at your own
            initiative and are responsible for compliance with local laws.
            <br />
            <br />
            12. MANDATORY BINDING ARBITRATION AND CLASS ACTION WAIVER
            <br />
            12.1. PLEASE READ THIS ARBITRATION PROVISION CAREFULLY TO UNDERSTAND
            YOUR RIGHTS. EXCEPT WHERE PROHIBITED BY LAW, YOU AGREE THAT ANY
            CLAIM YOU MAY HAVE IN THE FUTURE MUST BE RESOLVED THROUGH FINAL AND
            BINDING CONFIDENTIAL ARBITRATION. YOU ACKNOWLEDGE AND AGREE THAT YOU
            ARE WAIVING THE RIGHT TO A TRIAL BY JURY. THE RIGHTS THAT YOU WOULD
            HAVE IF YOU WENT TO COURT, SUCH AS DISCOVERY OR THE RIGHT TO APPEAL,
            MAY BE MORE LIMITED OR MAY NOT EXIST. <br />
            12.2. YOU AGREE THAT YOU MAY ONLY BRING A CLAIM IN YOUR INBoxIDUAL
            CAPACITY AND NOT AS A PLAINTIFF (LEAD OR OTHERWISE) OR CLASS MEMBER
            IN ANY PURPORTED CLASS OR REPRESENTATIVE PROCEEDING. YOU FURTHER
            AGREE THAT THE ARBITRATOR MAY NOT CONSOLIDATE PROCEEDINGS OR CLAIMS
            OR OTHERWISE PRESIDE OVER ANY FORM OF A REPRESENTATIVE OR CLASS
            PROCEEDING.
            <br />
            12.3. YOU AND THE COMPANY, ALONG WITH EACH OF ITS RESPECTIVE AGENTS,
            CORPORATE PARENTS, SUBSIDIARIES, AFFILIATES, PREDECESSORS IN
            INTEREST, SUCCESSORS, AND ASSIGNS, AGREE TO ARBITRATION (EXCEPT FOR
            MATTERS THAT MAY BE TAKEN TO SMALL CLAIMS COURT) AS THE EXCLUSIVE
            FORM OF DISPUTE RESOLUTION EXCEPT AS PROVIDED FOR BELOW, FOR ALL
            DISPUTES AND CLAIMS ARISING OUT OF OR RELATING TO THIS AGREEMENT,
            THE SERVICE, OR THE PRIVACY POLICY, UNLESS YOU ARE LOCATED IN A
            JURISDICTION THAT PROHIBITS THE EXCLUSIVE USE OF ARBITRATION FOR
            DISPUTE RESOLUTION.
            <br />
            12.4. Arbitration is a more informal way to settle disputes than a
            lawsuit in court. A neutral arbitrator, instead of a judge or jury,
            is used in arbitration, which allows for more limited discovery than
            in court and is subject to very limited review by courts. The same
            damages and relief that a court can award can be awarded by
            arbitrators. Please see more information about arbitration at
            <a href="http://www.adr.org">http://www.adr.org</a>.<br />
            12.5. A party intending to seek arbitration must first send to the
            other a written notice of intent to arbitrate (a "Notice") by an
            international courier with a tracking mechanism, or, in the absence
            of a mailing address provided by you to us, via any other method
            available to us, including via email. The Notice to the Company must
            be addressed to: AMC - BOULEVARD-B BUILDING, Ajman Media City,
            United Arab Emirates (as applicable, the "Arbitration Notice
            Address"). The Notice shall (i) describe the basis and nature of the
            claim or dispute; and (ii) set the specific relief sought (the
            "Demand"). If you and the Company do not reach an agreement to
            resolve the claim within 30 days after the Notice is received, then
            you or we may commence an arbitration proceeding as set forth below
            or file an inBoxidual claim in small claims court.
            <br />
            12.6. THE AMERICAN ARBITRATION ASSOCIATION ("AAA") WILL EXCLUSIVELY
            ADMINISTER THE ARBITRATION IN ACCORDANCE WITH ITS COMMERCIAL
            ARBITRATION RULES AND THE SUPPLEMENTARY PROCEDURES FOR
            CONSUMER-RELATED DISPUTES (THE "RULES"), AS MODIFIED BY THESE TERMS.
            <br />
            12.7. If you commence arbitration against us, you are required to
            provide a second Notice to the Company at the Arbitration Notice
            Address within seven (7) days of arbitration commencement. The Rules
            and AAA forms are available online at
            <a href="http://www.adr.org">http://www.adr.org</a>. Unless your
            Demand is equal to or greater than $1,000 or was filed in bad faith,
            in which case you are solely responsible for the payment of the
            filing fee, if you are required to pay a filing fee to commence an
            arbitration against us, then we will promptly reimburse you for your
            confirmed payment of the filing fee upon our receipt of the second
            Notice at the Arbitration Notice Address that you have commenced
            arbitration along with a receipt evidencing payment of the filing
            fee.
            <br />
            12.8. The arbitration shall be conducted exclusively in English. A
            single, independent, and impartial arbitrator with his or her
            primary place of business in Alexandria, Virginia (if you are from
            the United States) or in Ajman, United Arab Emirates (if you are not
            from the United States) will be appointed pursuant to the Rules, as
            modified herein. You and the Company agree to comply with the
            following rules, which are intended to streamline the arbitration
            process and reduce the costs and burdens on the parties: (i) the
            arbitration will be conducted online and/or be solely based on
            written submissions, the specific manner to be chosen by the party
            initiating the arbitration; (ii) the arbitration will not require
            any personal appearance by the parties or witnesses unless otherwise
            mutually agreed in writing by the parties; and (iii) any judgment on
            the award the arbitrator renders may be entered in any court of
            competent jurisdiction.
            <br />
            <br />
            13. GOVERNING LAW
            <br />
            13.1. These Terms and your use of the Service shall be governed by
            the laws of the United Arab Emirates, excluding its conflict of law
            principles. <br />
            13.2. To the extent that any action related to a dispute under these
            Terms is permitted to be brought in a court of law, such action will
            be subject to the exclusive jurisdiction of:
            <br />
            13.2.1. The state and federal courts located in the City of
            Alexandria, Virginia, if you are a resident of the United States; or{" "}
            <br />
            13.2.2. The courts of Ajman, United Arab Emirates, if you are not a
            resident of the United States; <br />
            and you hereby irrevocably submit to personal jurisdiction and venue
            in such courts, waiving any defense of improper venue or
            inconvenient forum.
            <br />
            <br />
            14. MISCELLANEOUS PROVISIONS
            <br />
            14.1. No delay or omission by us in exercising any of our rights
            upon any noncompliance or default by you regarding these Terms will
            impair any such right or be construed as a waiver thereof, and a
            waiver by the Company of any of the covenants, conditions, or
            agreements to be performed by you will not be construed as a waiver
            of any succeeding breach thereof or of any other covenant,
            condition, or agreement contained herein. <br />
            14.2. Subject to Section 12, if any provision of these Terms is
            found to be invalid or unenforceable, the reBoxing Terms will reBox
            in full force and effect and will be reformed to be valid and
            enforceable while reflecting the parties' intent to the greatest
            extent permitted by law. <br />
            14.3. Except as otherwise expressly provided herein, these Terms
            constitute the entire agreement between you and the Company
            regarding their subject matter and supersede all prior promises,
            agreements, or representations, whether written or oral, regarding
            such subject matter. <br />
            14.4. The Company may transfer or assign any and all of its rights
            and obligations under these Terms to any other person, by any means,
            including by novation, and by accepting these Terms, you consent to
            any such assignment and transfer. You confirm that placing a version
            of these Terms on the Service indicating another person as a party
            to the Terms shall constitute valid notice to you of the transfer of
            the Company's rights and obligations under the Agreement (unless
            otherwise expressly indicated). <br />
            14.5. All information communicated on the Service is considered an
            electronic communication. When you communicate with us through or on
            the Service or via other forms of electronic media, such as email,
            you are communicating with us electronically. You agree that we may
            communicate electronically with you and that such communications, as
            well as notices, disclosures, agreements, and other communications
            that we provide to you electronically, are equivalent to
            communications in writing and shall have the same force and effect
            as if they were in writing and signed by the party sending the
            communication. You further acknowledge and agree that by clicking on
            a button labeled "SUBMIT", "CONTINUE", "ADD TO CART", "PAY", or
            similar links or buttons, you are submitting a legally binding
            electronic signature and are entering into a legally binding
            contract. You acknowledge that your electronic submissions
            constitute your agreement and intent to be bound by these Terms. YOU
            HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS,
            AND OTHER RECORDS AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES,
            AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED THROUGH THE
            SERVICE. <br />
            14.6. In no event shall the Company be liable for any failure to
            comply with these Terms to the extent that such failure arises from
            factors outside the Company's reasonable control.
            <br />
            <br />
            15. CONTACT
            <br />
            If you need to send any notice under these Terms or have any
            questions regarding the Service, you may contact us at:
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
            Last Updated: 15 September 2023
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default TermsAndConditions;
