import React from 'react';
import './styles.scss'
import { BRAND_NAME } from '../../../../constants';

type Props = {

}
export default function Overview(props:Props){
  return (
      <section className='terms-text'>
      <h3>Overview</h3>
        <p>This website, {BRAND_NAME} (also referred to as "The Company"), offers this website, including all information,
          tools and services available from this site to you, the user, conditional to your acceptance of all terms, conditions,
            policies and notices stated here.
        </p>
        <p className='mt-10'>
        By using our site and/or purchasing something from us, you engage in our “Service” and agree to be bound by the following 
        terms and conditions (“Terms of Service”, “Terms”), including those additional terms and conditions and policies referenced 
        herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users 
        who are browsers, vendors, customers, merchants, and/ or contributors of content. 
        </p>
        <p className='mt-10'>
        Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, 
        you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you
          may not access the website or use any services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service. 
        </p>
        <p className='mt-10'>
        The Services are only intended for persons over the age of 18 residing in the country for which the Services are available. By registering on the Website, you 
        confirm that you are over 18 years of age. If you are under 18 years of age, you may not use the Services. You undertake to access the Services solely from one 
        of the countries for which the Services are available. You acknowledge that your access to and use of the Services may be restricted or prohibited by law in some 
        countries, and you undertake to only access and use the Services in accordance with applicable laws. 
        </p>
        <p className='mt-10'>
        Any new features or tools which are added to the current store (under provided accounts section) shall also be subject to the Terms of Service. You can review 
        the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service
          by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the
          website following the posting of any changes constitutes acceptance of those changes.
        </p>
        <p className='mt-10 p-warning'>
        NONE OF THE SERVICES PROVIDED TO YOU BY THE PROVIDER CAN BE CONSIDERED INVESTMENT SERVICES IN ACCORDANCE WITH APPLICABLE LAWS. THE PROVIDER DOES NOT GIVE OR PROVIDE 
        TO YOU ANY GUIDANCE, INSTRUCTIONS, OR INFORMATION ABOUT HOW OR IN WHICH MANNER YOU SHOULD PERFORM TRANSACTIONS WHEN USING THE SERVICES OR OTHERWISE, OR ANY OTHER SIMILAR
          INFORMATION ABOUT THE INVESTMENT TOOLS TRADED, NOR DOES THE PROVIDER ACCEPT ANY SUCH GUIDANCE, INSTRUCTIONS, OR INFORMATION FROM YOU. NONE OF THE SERVICES CONSTITUTE INVESTMENT 
          ADVICE OR RECOMMENDATIONS. NO EMPLOYEES, STAFF, OR REPRESENTATIVES OF THE PROVIDER ARE AUTHORIZED TO PROVIDE INVESTMENT ADVICE OR RECOMMENDATIONS. SHOULD ANY INFORMATION OR STATEMENT 
          OF ANY EMPLOYEE, STAFF, OR REPRESENTATIVES OF THE PROVIDER BE INTERPRETED AS INVESTMENT ADVICE OR RECOMMENDATIONS, THE PROVIDER EXPLICITLY DISCLAIMS THAT THE SAME IS INVESTMENT ADVICE
          OR RECOMMENDATIONS AND SHALL NOT BE RESPONSIBLE FOR THEM.
        </p>
        <p className='mt-10 p-grant'>
        We may grant access to third parties to our website in order to troubleshoot and/or maintain website, database or infrastructure related issues. These access are monitored and removed 
        after scope of work is performed
        </p>
       </section>
  )
}
