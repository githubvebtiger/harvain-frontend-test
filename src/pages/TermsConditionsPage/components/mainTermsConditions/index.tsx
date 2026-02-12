import React from 'react';
import './styles.scss'
import { BRAND_NAME, SUPPORT_EMAIL } from '../../../../constants';



export default function MainTermsConditions(){
  return (
    <div>
    <section className='main-terms-conditions'>
      <h3>ALL PAYMENTS ARE FINAL AND FOR EVALUATION PURPOSES ONLY</h3>
      <p>The registration fees are paid for allowing you to access the {BRAND_NAME} platform, models and services. The Customer is not entitled
         to a refund of the registration fees as the service is directly delivered after purchase. No refund applies to the service that {BRAND_NAME} offers.
      </p>
      <ul>
       <li>
         <h3>(1). Online Registration Terms</h3>
         <p>
         By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence,
         or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor
          dependents to use this site.
         </p>
         <p className='mt-19'>
         You may not use our services for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws
         in your jurisdiction (including but not limited to copyright laws).
         </p>
         <p className='mt-19'>
         A breach or violation of any of the Terms will result in an immediate termination of your Services.
         </p>
       </li>
      <li>
        <h3>(2). General Conditions</h3>
        <p>
        We reserve the right to refuse service to anyone for any reason at any time. You understand that your content (not including credit card information),
        may be transferred unencrypted and involve (a) transmissions over various networks; and (b) changes to conform and adapt to technical requirements of
        connecting networks or devices. Credit card information is always encrypted during transfer over networks.
        </p>
        <p className='mt-19'>
        You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service or any
        contact on the website through which the service is provided, without express written permission by us.
        </p>
        <p className='mt-19'>
        The headings used in this agreement are included for convenience only and will not limit or otherwise affect these Terms
        </p>
      </li>
      <li>
        <h3>(3). Accuracy, Completeness, and Timeliness of Information</h3>
        <p>We make every effort to ensure that the information we provide is accurate, however the information is also supplied by third parties and we are not
          responsible if information made available on this site is not accurate, complete or current. The material on this site is provided for general information
          only and should not be relied upon or used as the sole basis for making decisions without consulting primary, more accurate, more complete or more timely
           sources of information. Any reliance on the material on this site is at your own risk.
        </p>
        <p className='mt-19'>
        This site may contain certain historical information. Historical information, necessarily, is not current and is provided for your reference only.
         We reserve the right to modify the contents of this site at any time, but we have no obligation to update any information on our site. You agree
          that it is your responsibility to monitor changes to our site
        </p>
      </li>
      <li>
        <h3>(4). Modifications to the Service and Prices</h3>
        <p>Prices for our products are subject to change without notice. </p>
        <p className='mt-19'>We reserve the right at any time to modify or discontinue the Service
          (accounts provided) (or any part or content thereof) without notice at any time.
        </p>
        <p className='mt-19'>
        We shall not be liable to you or to any third-party for any modification, price change,
        suspension or discontinuance of the Service (The company has the right to seize operations at any given time).
        </p>
      </li>
      <li>
        <h3>(5). Products or Services (if applicable) </h3>
        <p>
        One registration per person is permitted. We reserve the right, but are not obligated, to limit the sales of our products or
       Services to any person, geographic region or jurisdiction. We may exercise this right on a case-by-case basis. We reserve the right
       to limit the quantities of any products or services that we offer. All descriptions of products or product pricing are subject to change
        at anytime without notice, at our sole discretion. We reserve the right to discontinue any product at any time. Any offer for any product
        or service made on this site is void where prohibited. We do not warrant that the quality of any products, services, information, or other
         material purchased or obtained by you will meet your expectations, or that any errors in the Service will be corrected.
        </p>
      </li>
      <li>
        <h3>(6). Accuracy of Billing and Account Information</h3>
        <p>We reserve the right to refuse any order you place with us.
           We may, in our sole discretion, limit or cancel quantities purchased
           per person, per household or per order. These restrictions may include orders placed by or
            under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address.
          In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing
          address/phone number provided at the time the order was made. We reserve the right to limit or prohibit orders that, in our sole
          judgment, appear to be placed by dealers, resellers or un-authorized distributors.
         </p>
         <p className='mt-19'>
         You agree to provide current, complete, and accurate purchase and account information for all purchases made at our store.
         You agree to promptly update your account and other information, including your email address and credit card numbers and
         expiration dates, so that we can complete your transactions and contact you as needed.
         </p>
      </li>
      <li>
        <h3>(7). {BRAND_NAME} Evaluation Stage and Master Stage</h3>
        <p className='ti-24'>(a). During the Evaluation Stage and Master Stage, you should not exceed the maximum loss limit which is based on a % of the initial account size. You must ensure that the maximum loss does not exceed the maximum loss limit at any given moment. </p>
      <ul>
        <li className='ti-42'>(i) The limits for the Evaluation and Master Stage:</li>
        <ul>
          <li className='ti-91'> (1). 1-Step Model: 6% maximum loss limit.</li>
          <li className='ti-91'> (2).2-Step Model: 10% maximum loss limit.</li>
          <li className='ti-91'> (3).3-Step Model: 6% maximum loss limit.</li>
          <li className='ti-91'> (4).X Model: 8% maximum loss limit.</li>
        </ul>
        <p className='ti-24'>(b). During the Evaluation Stage and Master Stage, you should not exceed the maximum daily limit which is based on a % of the starting equity or balance of the day. For the purpose of this rule, the higher value between equity and balance will be used. The Customer must ensure that the maximum daily loss does not exceed the maximum daily loss limit on any given day. The determination of the daily maximum loss will be based on the equity or balance at 00:00 CEST/server time and will remain in effect until the next 00:00 CEST/server time. </p>
        <li className='ti-42'>(i) The limits for the Evaluation and Master Stage:</li>
        <ul>
          <li className='ti-91'> (1). 1-Step Model: 4% maximum loss limit.</li>
          <li className='ti-91'> (2). 2-Step Model: 5% maximum loss limit.</li>
          <li className='ti-91'> (3). 3-Step Model: 4% maximum loss limit.</li>
          <li className='ti-91'> (4). X Model: 4% maximum loss limit.</li>
        </ul>
        <p className='ti-24'>(c). During the Evaluation Stage, you are required to meet specific simulated profit targets based on the initial account size and the model they are following without breaching any rule stated in the T&Cs and have 3 minimum trading days. The targets are as follows: </p>
        <ul>
          <li className='ti-42'>(i) Student account:</li>
          <ul>
            <li className='ti-91'>(1). 1-Step Model: 10% of the initial account size.</li>
            <li className='ti-91'>(2). 2-Step Model: 8% of the initial account size.</li>
            <li className='ti-91'>(3). 3-Step Model: 5% of the initial account size.</li>
            <li className='ti-91'>(4). X Model: 10% of the initial account size.</li>
          </ul>
          <li className='ti-42'>(ii) The Practitioner account:</li>
          <ul>
            <li className='ti-91'>(1). 1-Step Model: 5% of the initial account size.</li>
            <li className='ti-91'>(2). 2-Step Model: 5% of the initial account size.</li>
            <li className='ti-91'>(3). 3-Step Model: 8% of the initial account size.</li>
          </ul>
          <li className='ti-42'>(iii) The Senior account:</li>
          <ul>
            <li className='ti-91'>(1.) 3-Step Model: 5% of the initial account size.</li>
          </ul>
        </ul>
        <p className='ti-24'>  (d). Customer shall not perform simulated FOREX Trading in violation of: (i) the operation of real financial market, (ii) the current General Terms and Conditions of {BRAND_NAME}, (iii) the current trading rules of {BRAND_NAME} and the Responsible Trading Policy, see <br />Appendix A. </p>
        <p className='ti-24'> (e). If the customer fails to comply with the conditions specified in sections 7.a, 7.b, 7.c and 7.d during the Evaluation Stage, the Evaluation will be marked as "not passed." In such instances, the Customer’s account and Services will be terminated and canceled without any refund of the fees paid. </p>
        <p className='ti-24'> (f). If the customer does not adhere to the conditions outlined in sections 7.a, 7.b and 7.d during the Master Stage, the Master account will be marked as "not passed." In such scenarios, the Customer’s account and Services will be terminated and canceled without any refund of the fees paid.</p>
      </ul>
      </li>
      <li>
        <h3>(8). Rules of Demo/Simulation Trading</h3>
        <p className='ti-24'>(a). The account can not be inactive for more than 30 calendar days. Inactive means no trades have been executed on the account. </p>
        <p className='ti-24'>(b). Profit from trades that are closed within 1 minutes after opening will not be counted on the Master account. In the event any deductions result in the breach of the daily loss limit or maximum loss limit, the Customer is responsible for the violation. </p>
        <p className='ti-24'>(c). News Trading and holding over the weekend </p>
        <ul>
          <li className='ti-42'>(i). 1-Step, 2-Step and 3-Step Models: Trades can be held over the weekend. Profit from trades that are opened or closed 5 minutes prior to and after high
            impact news events and/or speeches on the affected currency will not be counted on the Master account UNLESS the trade was executed 5 hours prior to the news
             event. This restriction applies to all forms of trade execution, such as manual, pending, stop loss and take profit orders. During news speeches, the prohibited
              window will extend 5 minutes prior to the speech until 5 minutes after the speech has been finished. News event trading will result in the deduction of any profits
            made from trades executed within the restricted 10-minute window. Our system may automatically close the affected trades that are opened within the prohibited time
           window. Forex Factory is used as the news calendar source. In the event any deductions result in the breach of the daily loss limit or maximum loss limit, the Customer
           is responsible for the violation.
           </li>
           <li className='ti-42'>(ii). X Model: It is not allowed to hold trades during news and over the weekend. A position cannot be held or opened 5 minutes before and after a high-impact news
            event (10 minutes total) on the affected currency on the Master account. An open trade in this window on the affected currency will lead to a violation of the account.
            We use Forex Factory as our news calendar source. Also, holding a position over the weekend will result in a violation of the account
          </li>
        </ul>
        <p className='ti-24'>(d). Not exceeding the maximum 10 lots per day on the 1-Step, 3-Step and X Master accounts. The 10 lots limit per day rule means you can only open a total of 10 lots each
           day. If you exceed this limit, any open trades will be closed, and you won't be able to trade until the next day. This limit resets at midnight CE(S)T. If you have trades
           open at midnight, they count towards the next day's limit.
        </p>
        <p className='ti-24'> (e). Consistency Score: in {BRAND_NAME} X Model there is a 45% consistency score during both the evaluation and Master stage. This means that the biggest winning day can not exceed 45% of your profits.</p>
        <p className='ti-42'> (i). 45% Consistency score during the evaluation stage: If you hit the profit target during the evaluation phase but have not yet met the 45% consistency score, you can continue trading until you meet the consistency score. </p>
        <p className='ti-24 bold'> (f). FORBIDDEN TRADING PRACTICES AND TOXIC TRADING BEHAVIOR </p>
        <p>The following trading practices and toxic trading behaviors are prohibited during simulated trading:</p>
        <ul>
          <li className='ti-42'>(i). Any Trading activity that includes Gap trading, high frequency trading, toxic trading flow, server spamming, latency
            arbitrage, hedging, long short arbitrage, reverse arbitrage, tick scalping, server execution, and opposite account trading are all
             prohibited trading methods plus copy trading or account management by a third-party vendor will result in account termination.
             Keep in mind that using a third-party Expert Advisor is allowed as long as it is a trade or risk manager. Using any other third-party
             Expert Advisor is not allowed. This will lead to the violation of the account and the decline of your remuneration. Furthermore,
             Customer shall trade responsibly and not exploit the Services by performing trades without applying market standard risk management
             rules for trading on financial markets, this includes, among others, the following practices (i) opening substantially larger position
             sizes compared to Customer’s other trades, whether on this or any other Customer’s account, (ii) opening substantially smaller or larger
             number of positions compared to Customer’s other trades, whether on this or any other Customer’s account, or (iii) purposely trade news events.
             The Company reserves the right to determine, at its own discretion, whether certain trades, practices, strategies, or situations are Forbidden Trading Practices.
          </li>
          <li className='ti-42 mt-26'>
          (ii). Excessive Risk-Taking (Over-Leveraging): Participating in trades with disproportionately high levels of risk in relation to the trader's capital
          or risk tolerance. This often involves utilizing excessive leverage, causing overexposure or full margin, which can magnify both gains and losses.
          Additionally only on the 2-Step Master account, executing excessive amounts of lots relative to the account size exceeding the Maximum Lot Exposure Limit.
          </li>

        </ul>
        <p className='mt-26'>Maximum Lot Exposure Limit per simulated account size for 2-Step Master accounts: $25,000 is max 10 lots $50,000 is max 20 lots $100,000 is max 40 lots
          If you exceed this limit, all the profits from trades that were opened and were ABOVE the limit will be deducted from the account. In the event any deductions
           result in the breach of the daily loss limit or maximum loss limit, the trader is responsible for the violation. </p>
        <p className='mt-26'>The first time we detect that the lot exposure limit was exceeded will result in a warning. The second time will result in a closure of the account,
           profit deduction and 30% performance commission, plus all the profits from trades that were opened and were ABOVE the limit will be deducted from the account. </p>
        <ul>
          <li className='ti-42 mt-26'>(iii). Gambling Behavior: Trading is driven by emotions rather than rational analysis, similar to gambling. Traders may pursue losses, make impulsive trades, or
            display addictive tendencies, leading to negative trading outcomes. Your biggest loss should not exceed 3% of the account size on the Master account only.
            Splitting up a trade into multiple positions will be counted as one single trade.</li>
          <li className='ti-42'>
          (iv). Overtrading: Continuously entering and exiting trades without a clear strategy or rationale, resulting in diminished profitability and emotional exhaustion.
          </li>
          <li className='ti-42'>(v). High-Frequency Trading (HFT):Engaging in excessive and rapid trading activities indicative of higher volatility, which may result in significant losses.
            Profit from trades that are closed within 1 minute after opening will not be counted on our Master accounts. In the event any deductions result in the breach
            of the daily loss limit or maximum loss limit, the trader is responsible for the violation. </li>
          <li className='ti-42'>(vi). Arbitrage: All forms of arbitrage are considered toxic due to the lack of a clear underlying idea, strategy, or rationale. Below are two common arbitrage strategies: </li>
          <ul>
            <li className='ti-91'>(1). Hedge Arbitrage: Simultaneously entering opposing positions with different firms. </li>
            <li className='ti-91'>(2). Latency Arbitrage: Exploiting disparities in trade execution times across various trading platforms or venues. Traders using this strategy seek to profit from minor price differences resulting from delays in order processing or data feed. </li>
          </ul>
          <li className='ti-42'> (vii). Poor Money Management: Traders who frequently encounter margin calls due to inadequate funds or risky positions may indicate a lack of risk management, posing a threat to their accounts and potentially the firm’s stability. </li>
          <li className='ti-42'>(viii). Behavioral Patterns: Inconsistent behaviors, such as trading during non-liquid market hours to exploit liquidity shortages, consistently disregarding risk management principles, or making emotional decisions. </li>
          <li className='ti-42'>(ix). Reverse Trading: Signs and behavior, which includes risking the full daily loss on one trade, which often indicates reverse trading between different firms. </li>
          <li className='ti-42'>(x). copy trading or account management by a third-party vendor is prohibited. Keep in mind that using a third-party Expert Advisor is allowed as long as it is a trade or risk manager. Using any other third-party Expert Advisor is not allowed. </li>

        </ul>
        <p className='ti-24'> (g). We can carry out casual risk assessment interviews. The purpose of these interviews is to ensure that there are no prohibited or suspicious activities on the account, including identity theft or fraud. This policy grants us the right to conduct
          periodic risk and compliance assessments of customer accounts to evaluate customer risk profiles, trading strategies, and behaviors. These assessments can occur every month, week, or day. Once a periodic review is initiated, we reserve the right to
          withhold remuneration until the risk assessment is satisfactorily completed. Users are required to participate in mandatory risk assessment interviews by providing us with answers to common questions about their trading strategies and behaviors.
          Failure to comply with this requirement could result in us withholding remuneration and terminating services to the Customer. </p>
        <p className='ti-24'> (h). If you are suspected of engaging in any forbidden trading practices and toxic trading behavior mentioned in section 8.f, the Company may consider it as a violation of the account. The Company may terminate the contract, stop providing all services, deduct the trades, implement new restrictions, decrease leverage on a specific or any Customer's account. The Company reserves the right to determine, at its own discretion, whether certain trades, practices, strategies, or situations are Forbidden Trading Practices and Toxic Trading Behaviors. </p>
        <p className='ti-42'> (i). If the Customer engages in any of the practices described in section 8.f, the Company may prevent the Customer from accessing all Services, including access to the Dashboard and Trading Platforms, without any compensation and remunaration. In such a case, the Customer is not entitled to a refund of the fees paid.</p>
      </li>
      <li>
        <h3>(9). Optional Tools</h3>
        <p>We may provide you with access to third-party tools over which we neither monitor nor have any control nor input. You acknowledge and agree that we provide access to such tools on an ”as is” and “as available” basis without any warranties, representations or conditions of any kind and without any endorsement. We shall have no liability whatsoever arising from or relating to your use of optional third-party tools. Any use by you of optional tools offered through the site is entirely at your own risk and discretion and you should ensure that you are familiar with
          and approve of the terms on which tools are provided by the relevant third-party provider(s). We may also, in the future, offer new services
         and/or features through the website (including, the release of new tools and resources). Such new features and/or services shall also be
         subject to these Terms of Services.</p>
      </li>
      <li>
        <h3>(10). Third-party</h3>
        <p className='ti-24'>(a). Third- Party links: Certain content, products and services available via our Service may include materials from third-parties.
          Third-party links on this site may direct you to third-party websites that are not affiliated with us. We are not responsible for examining
          or evaluating the content or accuracy and we do not warrant and will not have any liability or responsibility for any third-party materials
          or websites, or for any other materials, products, or services of third-parties. We are not liable for any harm or damages related to the
          purchase or use of goods, services, resources, content, or any other transactions made in connection with any third-party websites.
          Please review carefully the third-party’s policies and practices and make sure you understand them before you engage in any transaction.
          Complaints, claims, concerns, or questions regarding third-party products should be directed to the third-party. </p>
        <p className='ti-24'>(b). Third-Party Provider Compliance: Our platform integrates with various third-party providers
          to enhance user experience and offer comprehensive services. You must comply with the terms and conditions set forth
          by these third-party providers in addition to our own terms and conditions. (c). Blocking Due to Compliance Reasons:
          If a third-party provider blocks or restricts you for any compliance-related reasons, including but not limited to
          violations of laws, regulations, or the provider’s terms of service, we reserve the right to mirror such restrictions
          on our platform without further explanation. This means that if you are blocked by a third-party provider, you may also
          be blocked from accessing our platform. </p>
        <p className='ti-24'>(d). Limitation of Liability for Third-Party Issues: We are not liable for any downtime, errors, bugs,
          or other issues caused by third-party providers. This includes any disruptions to our services resulting from problems with
          third-party systems. While we strive to ensure a seamless experience, issues arising from third-party integrations are beyond
          our control and we cannot guarantee uninterrupted access or error-free functionality.</p>
      </li>
      <li>
        <h3>(11). Risk Management and Compliance Any Trading activities that are used to take</h3>
        <p>advantage of Trading Platform inefficiencies (Gap trading, high frequency trading, toxic
          trading flow, server spamming, latency arbitrage, hedging, long short arbitrage, reverse arbitrage, tick scalping,
          server execution, opposite account trading) are all prohibited trading methods plus copy trading or account management
          by a third-party vendor will result in account termination, such activities with {BRAND_NAME} will result in account termination.
          Keep in mind that using a third-party Expert Advisor is allowed as long as it is a trade or risk manager. Using any other third-party
          Expert Advisor is not allowed. This will lead to violating the account and declining your payout request. Furthermore, Customer shall
          trade responsibly and not exploit the Services by performing trades without applying market standard risk management rules for trading
          on financial markets, this includes, among others, the following practices (i) opening substantially larger position sizes compared
          to Customer’s other trades, whether on this or any other Customer’s account, (ii) opening substantially smaller or larger number of
          positions compared to Customer’s other trades, whether on this or any other Customer’s account, or (iii) purposely trade news events.
          The Company reserves the right to determine, at its own discretion, whether certain trades, practices, strategies, or situations are
          Forbidden Trading Practices. We can carry out casual risk assessment interviews. The purpose of these interviews is to ensure that
          there are no prohibited or suspicious activities on the account, including identity theft or fraud. This policy grants us the right
          to conduct periodic risk and compliance assessments of customer accounts to evaluate customer risk profiles, trading strategies,
          and behaviors. These assessments can occur every month, week, or day. Once a periodic review is initiated, we reserve the right to
          withhold remuneration until the risk assessment is satisfactorily completed. </p>
          <p className='mt-26'>Users are required to participate in mandatory risk assessment interviews by providing us with answers to common questions about
            their trading strategies and behaviors. Failure to comply with this requirement could result in us withholding remuneration and
            terminating services to the user.</p>
      </li>
      <li>
        <h3>(12). Personal Information</h3>
        <p>Your submission of personal information through the store is governed by our Privacy Policy.</p>
      </li>
      <li>
        <h3>(13). Prohibited Uses</h3>
        <p className='ti-24'>(a). In addition to other prohibitions as set forth in the Terms of Service, you are prohibited from using the site or its content:
          (a) for any unlawful purpose; (b) to solicit others to perform or participate in any unlawful acts; (c) to violate any international,
          federal, provincial or state regulations, rules, laws, or local ordinances; (d) to infringe upon or violate our intellectual property
          rights or the intellectual property rights of others; (e) to harass, abuse, insult, harm, defame, slander, disparage, intimidate, or
          discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability; (f) to submit false
          or misleading information; (g) to upload or transmit viruses or any other type of malicious code that will or may be used in any way
          that will affect the functionality or operation of the Service or of any related website, other websites, or the Internet; (h) to
          collect or track the personal information of others; (i) to spam, phish, pharm, pretext, spider, crawl, or scrape; (j) for any obscene
          or immoral purpose; or (k) to interfere with or circumvent the security features of the Service or any related website, other websites,
          or the Internet.</p>
        <p className='ti-24'>(b). Traders associated with proprietary trading firms, including their owners and employees, are strictly prohibited from engaging in trading activities with {BRAND_NAME}.</p>
        <p className='ti-24'>(c). Registering with multiple e-mail addresses. We reserve the right to terminate your use of the Service or any related website for violating any of the prohibited uses.</p>
      </li>
      <li>
        <h3>(14). Disclaimer of Warranties; Limitation of Liability</h3>
        <p>We do not guarantee, represent or warrant that your use of our service will be uninterrupted, timely, secure or error-free. We do not warrant
          that the results that may be obtained from the use of the service will be accurate or reliable. You agree that from time to time we may remove
          the service for indefinite periods of time or cancel the service at any time, without notice to you. You expressly agree that your use of, or
          inability to use, the service is at your sole risk. The service and all products and services delivered to you through the service are
          (except as expressly stated by us) provided ‘as is’ and ‘as available’ for your use, without any representation, warranties or conditions
          of any kind, either express or implied, including all implied warranties or conditions of merchantability, merchantable quality, fitness
          for a particular purpose, durability, title, and non-infringement. In no case shall Intellimeter, our directors, officers, employees,
          affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct,
          indirect, incidental, punitive, special, or consequential damages of any kind, including, without limitation lost profits, lost revenue,
          lost savings, loss of data, replacement costs, or any similar damages, whether based in contract, tort (including negligence), strict
          liability or otherwise, arising from your use of any of the service or any products procured using the service, or for any other claim
          related in any way to your use of the service or any product, including, but not limited to, any errors or omissions in any content, or any
          loss or damage of any kind incurred as a result of the use of the service or any content (or product) posted, transmitted, or otherwise made
          available via the service, even if advised of their possibility. Because some states or jurisdictions do not allow the exclusion or the
          limitation of liability for consequential or incidental damages, in such states or jurisdictions, our liability shall be limited to the
          maximum extent permitted by law. Furthermore, any performance commission, remuneration, or similar compensation related to the use of our
          service is not considered a liability of Intellimeter. We are not responsible for ensuring the payment of any such commission or remuneration,
          and any claims related to these payments are expressly excluded from our liability.</p>
      </li>
      <li>
        <h3>(15). Indemnification</h3>
        <p>You agree to indemnify, defend and hold harmless Intellimeter and our parent, subsidiaries, affiliates, partners, officers, directors,
          agents, contractors, licensors, service providers, subcontractors, suppliers, interns and employees, harmless from any claim or demand,
          including reasonable attorneys’ fees, made by any third-party due to or arising out of your breach of these Terms of Service or the documents
          they incorporate by reference, or your violation of any law or the rights of a third-party.</p>
      </li>
      <li>
        <h3>(16). Severability</h3>
        <p>In the event that any provision of these Terms of Service is determined to be unlawful, void or unenforceable, such provision shall
          nonetheless be enforceable to the fullest extent permitted by applicable law, and the unenforceable portion shall be deemed to be severed
          from these Terms of Service, such determination shall not affect the validity and enforceability of any other remaining provisions.</p>
      </li>
      <li>
        <h3>(17). Termination</h3>
        <p >The obligations and liabilities of the parties incurred prior to the termination date shall survive the termination of this agreement
          for all purposes. These Terms of Service are effective unless and until terminated by either you or us. You may terminate these Terms of
          Service at any time by notifying us that you no longer wish to use our Services, or when you cease using our site. </p>
        <p className='mt-26'>If in our sole judgment you fail, or we suspect that you have failed, to comply with any term or provision of these Terms of Service, we also may terminate this
          agreement at any time without notice and you will remain liable for all amounts due up to and including the date of termination; and/or accordingly may
          deny you access to our Services (or any part thereof).</p>
      </li>
      <li>
        <h3>(18). Disputes</h3>
        <p>All communications between {BRAND_NAME} ("The Company") and you, the user of our services, are strictly confidential. This includes, but is not limited to, emails,
          messages through our website, phone calls, and any other form of communication. </p>
        <p className='mt-26'>By using our site and engaging in our Service, you agree that you will not disclose, share, publish, or otherwise make public any part of these communications
          without the prior written consent of The Company. This confidentiality agreement is essential to maintain the trust and integrity of our services. Any breach
          of this confidentiality provision will be considered a violation of these Terms and may result in immediate termination of your access to our services, along
          with any other remedies available to The Company under law.</p>
      </li>
      <li>
        <h3>(19). Entire Agreement</h3>
        <p>The failure of us to exercise or enforce any right or provision of these Terms of Service shall not constitute a waiver of such right or provision.
          These Terms of Service and any policies or operating rules posted by us on this site or in respect to The Service constitutes the entire agreement
          and understanding between you and us and govern your use of the Service, superseding any prior or contemporaneous agreements, communications and proposals,
          whether oral or written, between you and us (including, but not limited to, any prior versions of the Terms of Service). Any ambiguities in the interpretation
          of these Terms of Service shall not be construed against the drafting party.</p>
      </li>
      <li>
        <h3>(20). Changes to Terms of Service</h3>
        <p>You can review the most current version of the Terms of Service at any time at this page. We reserve the right, at our sole discretion, to update,
          change or replace any part of these Terms of Service by posting updates and changes to our website. It is your responsibility to check our website
          periodically for changes. Your continued use of or access to our website or the Service following the posting of any changes to these Terms of
          Service constitutes acceptance of those changes.</p>
      </li>
      <li>
        <h3>(21). Confidentiality of Communications</h3>
        <p>All communications between {BRAND_NAME} ("The Company") and you, the user of our services, are strictly confidential. This includes, but is not
          limited to, emails, messages through our website, phone calls, and any other form of communication. </p>
        <p className='mt-26'>By using our site and engaging in our Service, you agree that you will not disclose, share, publish, or otherwise make public any part of these
          communications without the prior written consent of The Company. This confidentiality agreement is essential to maintain the trust and integrity
          of our services. Any breach of this confidentiality provision will be considered a violation of these Terms and may result in immediate termination
          of your access to our services, along with any other remedies available to The Company under law.</p>
      </li>
      <li>
        <h3>(22). Contact Information</h3>
        <p>Questions about the Terms of Service should be sent to us at <a href={`mailto:${SUPPORT_EMAIL}`} className='mail-link'>{SUPPORT_EMAIL}</a></p>
      </li>
      <li>
        <h3>(23). Applicable Law</h3>
        <p>Any legal relations established by these Terms and Conditions or related to them, as well as any related non-contractual legal relations,
          shall be subject to the laws of Dubai, where applicable. Should there be a dispute between the parties and if the said dispute is not able
          to be resolved through arbitration as stated in the TOU by law or by circumstances, the dispute shall be resolved by the court of Dubai. </p>
      </li>
      <li>
        <h4 className='mt-26'>Review and Revision </h4>
        <p className='conclusion'>{BRAND_NAME} retains the right to review and revise this terms and conditions at any time. The is subject to modification without prior notice. </p>
      </li>
      <li>
        <h4 className='mt-26'>Acknowledgment </h4>
        <p className='conclusion'>When you engage in trading with {BRAND_NAME}, you acknowledge that you have thoroughly read, understood, and agreed to comply with the Terms and conditions..</p>
      </li>
      </ul>
    </section>
    <section className='main-terms-conditions second'>
      <h2>Appendix A: Responsible Trading Policy</h2>
      <p>At {BRAND_NAME}, we are committed to providing a secure and reliable environment that fosters responsible trading practices. To achieve this, we have
        established an even better payout system than we already had, as well as a Responsible Trading Policy that outlines our expectations for trading
        activities on your accounts. All trading activities conducted on your simulated accounts must be legitimate and accompanied by common sense – as
        if they were copied on accounts trading in a natural environment.</p>
        <p className='mt-22'>Traders should use our simulated accounts with high integrity and professionalism. This means adopting prudent risk management strategies as
          if they were trading their personal accounts with their own funds.</p>
        <p className='mt-22'>Our mission is to enable genuine traders to grow personally and financially, allowing them to achieve their life goals with greater ease.
          Responsible trading practices are crucial for traders who want to have a successful trading career. By adopting a responsible approach to
          trading, you will trade with confidence and peace of mind, automatically putting yourself in an excellent position to achieve your financial
          goals and enjoy the many benefits that come with it.</p>
        <p className='mt-22'>This policy aims to educate and guide you on how to trade responsibly. It ensures that you have the necessary information to manage your accounts effectively
          and avoid reckless and unprofessional trading behaviour. We expect all {BRAND_NAME} traders to approach their activities with a sense of duty,
          professionalism, and respect.</p>
        <h4 className='mt-22'>Responsibilities </h4>
        <p>When trading with our accounts, you must adhere to legitimate trading practices and refrain from any type of toxic trading flow, news trading, and unprofessional trading behaviors
          that are unsustainable in the long term and contradictory to a responsible trading approach. All {BRAND_NAME} traders utilizing our firm's resources and accounts will adhere to the
          highest standards of ethical conduct. Specifically, we expect you to refrain from engaging in any activities that seek to exploit or misappropriate our resources or the accounts
          we provide in good faith. Additionally, we emphasize the importance of avoiding trading practices designed to manipulate the {BRAND_NAME} evaluation process, which is intended to provide
          a fair and objective assessment of trading performance.</p>
        <p className='mt-22'>
        As a {BRAND_NAME} trader, you are responsible for:
        </p>
        <ul>
          <li className='mt-22'>
            <p className='ti-49'><span>Trading with caution:</span> A responsible trader knows that for long-term success, it’s essential to trade with caution and avoid impulsive decisions, avoid trading the news
              and trying to purposely trading the news, News ttradign is forbidden and intentionally trading the news will lead to a termination since its an abuse
               to our {BRAND_NAME} accounts which were given in good faith. Make informed decisions based on a sound analysis and be aware of the bigger picture,
               even outside the market itself.</p>
          </li>
          <li className='mt-22'>
            <p className='ti-49'><span>Risk management:</span> Avoid overtrading and overleveraging. You must apply sound risk management and have realistic expectations when engaging with the market, set your
            profit targets, and stop-loss levels accordingly. Adjust your position size accordingly and smartly manage your transactions; try to make use of taking partials - sometimes
            the market can reverse on you or go into a consolidation, and the trade will not play out as you were expecting. Excessive position sizing or risk exposure can be a detrimental
            strategy for traders, particularly when experiencing a string of unfavorable trades. To recover losses, traders may be tempted to take on more prominent positions, hoping for a
            significant winning trade. However, this approach is often driven by emotional factors rather than sound trading principles. When a trader is distressed, their decision-making is
            compromised, and they are more likely to abandon their strategy and risk management practices. In reality, prominent positions or the accumulation of multiple positions simultaneously
            is a high-risk approach that {BRAND_NAME} do not recommend. A more conservative and risk-controlled approach is essential for achieving long-term success and avoiding financial losses.
            It is crucial to recognize that even experienced professionals typically adopt a small-risk strategy, which enables them to generate substantial profits in a stable and secure environment.
            It is essential to prioritize prudent risk management and avoid reckless trading practices that can lead to premature exits from the market. Amateur traders must avoid falling prey to impulsive
            decisions and focus on developing a disciplined approach to trading. By adopting a conservative mindset and employing effective risk management techniques, traders can mitigate potential losses
            and achieve sustained success over the long term.</p>
          </li>
          <li className='mt-22'>
            <p className='ti-49'><span>Capital management and profits preservation:</span> Take care of your accounts and use them as if trading your capital on your account. You must prioritize
            capital preservation when the market environment seems or tends to be much riskier than usual – uncertain market conditions should be avoided, and you should implement profits preservation
            measures - have an innovative and safe approach by not risking excessive profits, it is crucial to not risk more than 3% per trader, trader idea or position, your biggest losing trade shouldnt
            be more than 3% of the account size for your trading flow not to be considered as a toxic trading flow. {BRAND_NAME} offers payouts every Tuesday, meaning a payout every week, 4 - 5 monthly payouts.
            There is no reason to engage in reckless and unprofessional trading behavior, our favourite and top traders generate roughly around 5% a month, we emphasis this approach.</p>
          </li>
          <li className='mt-22'>
            <p className='ti-49'><span>Regularly review and adjust:</span> To maintain a high level of proficiency and minimize losses, it is essential to periodically review and assess your trading performance.
            This process involves thoroughly examining your trading activities, including both successful and unsuccessful endeavors. By analyzing your past performance, you can identify areas for improvement,
            learn from your mistakes, and develop a more effective trading strategy. Regularly reviewing your trading performance enables you to refine your approach, adjust to changing market conditions, and adapt
            to new information. This ongoing evaluation process also helps you to develop a more nuanced understanding of your trading strengths and weaknesses, allowing you to optimize your strategy accordingly.
            </p>
            <p className='mt-22'>
            Moreover, it is crucial to continually reassess your risk tolerance, market exposure, and overall trading goals to ensure that your trading activities align with your objectives. By doing so, you can
            maintain a prudent and disciplined approach to trading, minimizing the risk of significant losses or prolonged periods of underperformance. In addition, a regular review of your trading performance allows
            you to refine your risk management techniques, update your market analysis, and stay informed about regulatory changes and market developments. By staying informed and adapting to changing circumstances,
            you can maintain a competitive edge in the markets and achieve long-term success. Ultimately, the ability to regularly review and adjust your trading strategy is a critical component of effective trading.
            By embracing this ongoing process, you can optimize your trading performance and minimize losses.
            </p>
          </li>
          <li className='mt-22'>
            <p className='ti-49'><span>Compliance with the firm's rules:</span>  Traders should comply with these guidelines, and ensure that their trading activities align with responsible trading behavior. Failure
            to comply with these requirements may result in actions against the trader, including suspension or termination of trading privileges. All traders are responsible for being aware of and respectingect
            our Responsible Trading Pol and as any other relevant {BRAND_NAME} policies and procedures. By doing so, traders can maintain a high level of accountability, thereby ensuring our genuine traders of
            a reliable long-term collaboration with {BRAND_NAME} term.</p>
          </li>
        </ul>
        <h4 className='mt-22'>Best Practices</h4>
        <p>When it comes to trading, it's not about getting rich quickly, but instead building a sustainable foundation for long-term success. This means adopting a disciplined approach that prioritizes patience,
          consistency, and careful risk management.</p>
        <p className='mt-22'>To ensure responsible trading practices, we recommend the following best practices:</p>
        <ul>
        <li>
            <p className='ti-49'><span>Having clear trading plans and realistic goals while being aware of the surroundings: </span>
            To navigate the complexities of the financial markets confidently, it is essential to establish a clear and well-defined trading plan. This plan should be grounded in a thorough understanding of market
            conditions and an awareness of global events and their potential impact on the markets. The current geopolitical landscape, where uncertainty and volatility can be felt, demands a heightened sense of
            vigilance and adaptability. A prudent approach to trading involves setting realistic goals carefully calibrated to the current account situation, market conditions, and prevailing circumstances.
            Furthermore, staying informed about global events and their potential implications for the markets is crucial. By adopting a thoughtful and informed approach to trading, traders can better
            navigate the markets. A clear trading plan and a deep understanding of market conditions and global events can help mitigate risk and increase the likelihood of successful
            trading outcomes.
            </p>
        </li>
        <li className='mt-22'>
            <p className='ti-49'><span>Avoid gambling: </span>
            When trading, adopting a responsible and professional approach is crucial. Treat your simulated accounts as if you're selling your account with your your funds - you wouldn't recklessly gamble
            with your funds, and you shouldn't engage in such behavior on your {BRAND_NAME} account either. Trading is science, and gambling belongs to the casino. Trading requires a thoughtful and
            strategic approach. Don't get caught up in the hype of trying to get lucky in the market. Instead, make informed trades based on thorough analysis and a well-thought-out strategy.
            A Real trader don't rely on luck or emotions; they have a solid foundation in their approach that allows them to make profitable trades consistently. Serious traders have a deep
            understanding of their strategy, which gives them an edge over the market. This edge isn't just a one-time deal but a consistent advantage that
            allows them to generate profits over time. When trading with the {BRAND_NAME} account, it's essential to be responsible and avoid reckless behavior. Avoid all-or-nothing
            strategies. Pay attention to your position size, and keep your confidence high, as this can quickly spiral out of control. It's also important to acknowledge that
            losses are a natural part of trading. When you experience losses, it's crucial not to let emotions get the best of you. Don't engage in revenge trading, thinking you'll
            recover your losses by making impulsive decisions. Instead, take a step back, reassess your strategy, and consider whether you're allowing emotions to cloud your judgment.
            Remember, trading is a marathon, not a sprint. It requires discipline, patience, and a long-term perspective. By adopting a responsible and professional approach,
            you'll be more than capable of achieving consistent positive results and, automatically, lasting success.
            </p>
        </li>
        <li className='mt-22'>
            <p className='ti-49'><span>Choose your trading assets and get to know them: </span>
             Good traders with long-term consistency do not trade dozens of trading assets – it's essential to focus on a few critical assets and get to know them.
             A successful trader doesn't try to trade everything under the sun - that's a recipe for disaster. Being an intelligent trader means getting to know the
             market you’re trading, getting personal with it, learn its unique characteristics. By limiting yourself to a smaller number of assets, you can better
             understand how they work and respond to different market conditions. Use correlation between assets when it comes to analysis, but try not to trade everything you see.
             Some traders tend to trade multiple instruments to diversify their risk. However, even here, a trader may open several positions representing several instruments
             or currency pairs. Still, at the same time, the trader is exposed to more risk on one instrument or currency. A typical case may be opening several positions on different
             significant pairs. What looks like a diversified position could simply be a massive loss. Concentrating on only a few trading assets doesn’t mean to ignore everything else.
             It’s important to check different significant markets. This allows traders to identify patterns and correlations between assets, which can be incredibly valuable in their analysis.
             The point is to try not to get caught up in the excitement of having at your disposal many different markets and tradable assets, and jump from one to another in a chaotic way and
             in a short period. Trading too many instruments simultaneously can lead to reckless decisions and increased risk. Some traders may try to diversify their risk by trading multiple
             assets, but this approach can be misleading. For example, opening various positions on different currency pairs may seem like a smart way to spread risk. Still, it can increase
             your exposure to losses on one particular instrument or pair. It's not uncommon for traders to get caught up in this trap and suffer a massive loss. In reality, trading multiple
             assets can be a double-edged sword. On one hand, it can provide diversification benefits and reduce risk. On the other hand, it can also increase the complexity of your trading
             strategy and make it harder to manage your positions effectively. By focusing on a few critical assets and developing a deep understanding of them, you'll be better equipped to
             make informed trading decisions and achieve long-term success.
            </p>
        </li>
        <li className='mt-22'>
            <p className='ti-49'><span>Stay connected to the world: </span>
            Financial literacy and strong knowledge in multiple areas is critical to making informed decisions in the market. It's crucial to stay connected to the global economy and know
            the latest news, trends, and events that can impact the financial markets. Don't just focus on charts and technical analysis - take a step back and consider the broader picture.
            Consider how historical events, current happenings, and future outlooks intersect and influence the market. It's not just about what's happening in your industry or market - stay
            informed about what's happening in other sectors and areas of life. For example, changes in global politics, conflicts, natural disasters, or technological breakthroughs can all
            affect the financial markets. By staying informed and thinking critically about the interconnectedness of these factors, you'll be better equipped to make informed decisions and
            adapt to changing market conditions. Remember, the financial markets are constantly evolving, and being aware of what's happening outside of your bubble is crucial to staying ahead of the curve.
            By staying connected and informed, you'll be better positioned to navigate the ups and downs of the market and make intelligent decisions.
            </p>
        </li>
        <li className='mt-22'>
            <p className='ti-49'><span>Take breaks: </span>
            Taking breaks in trading can't be overstated. When you're constantly bombarded with market data and your emotions run high, it's easy to make reckless decisions that can harm your performance.
            Overtrading and obsessing over charts can lead to a vicious cycle of impulsive decisions, ultimately sabotaging you. To avoid this pitfall, taking regular breaks to clear your head and
            regain your composure is essential. This isn't about being lazy or uninterested in the markets – it's about being intelligent and strategic. By stepping away from the charts and taking
            a break, you can reflect on your trades, see if your strategy for that day is still valid, and refocus on your goals. Trading requires mental toughness, discipline, and patience.
            Taking calculated breaks will help you focus better when you’re back on the charts. If you feel tired or not in a sharp mental state, you can always take a break and return stronger.
            </p>
        </li>
        </ul>
        <h4 className='mt-22'>Consequences of Non-Compliance</h4>
        <p>Be aware of the following potential consequences for non-compliance: </p>
        <ol>
          <li><p>1. Account suspension or closure: Your account may be suspended or closed if it is determined that you are not trading responsibly</p></li>
          <li><p>2. Restrictions and limitations: We reserve the right to restrict and limit your account if your trading behaviour does not comply with our policies. </p></li>
          <li><p>3. Denied performance fees: Performance fees may be denied to discourage toxic trading practices and unsustainable trading behaviours, still {BRAND_NAME} retains the title of ZERO PAYOUT DENIALS.</p></li>
        </ol>
        <h4 className='mt-22'>Review and Revision </h4>
        <p >{BRAND_NAME} retains the right to review and revise this Responsible Trading Policy anytime. The policy is subject to modification without prior notice.</p>

        <h4 className='mt-22'>Acknowledgment </h4>
        <p >When you trade with {BRAND_NAME}, you acknowledge that you have thoroughly read, understood, and agreed to comply with the Responsible Trading Policy</p>
    </section>
    </div>
  )
}
