import React from 'react';
import './styles.scss'
import { LogoDarkIcon, LogoIcon } from '../../assets';
import { NavConfig } from './const'
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../provider/ThemeProvider';
import { BRAND_NAME } from '../../constants';

type Props = {
  path: string;
  name: string;
}

function FooterList(props: Props) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(props.path)
    // Scroll to top after navigation
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <li><a onClick={handleClick}>{props.name}</a></li>
  )
}

export default function Footer() {
  const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  return (
    <footer>
      <div className="footer-logo container">
        <img src={ isDarkTheme ? LogoDarkIcon : LogoIcon } alt="logoIcon"/>
      </div>
      <div className="footer-content container">
        <p>
          All content published and distributed by {BRAND_NAME}, and its affiliates(collectively, the Company) is to be
          treated as general information only.
          None of the information provided by the Company or contained herein is intended as investment advice, an offer
          or solicitation of an offer to buy or sell,
          or a recommendation, endorsement, or sponsorship of any security, company, or fund. {BRAND_NAME} does not act as
          or conduct services as a broker. {BRAND_NAME} does not act as or conduct services as a custodian. People who register for our programs do so at their own
          volition, Purchases of programs should not be
          considered deposits. All fees are used for operation costs including, but not limited to, staff, technology
          and other business related expenses and must bee
          paid by customer before the payout. Applicable law to be under the laws of The United Arab Emirates and USA.
        </p>

        <ul>
          <FooterList {...NavConfig[0]}/>
          <FooterList {...NavConfig[1]}/>
          <FooterList {...NavConfig[2]}/>
          <FooterList {...NavConfig[3]}/>
          <FooterList {...NavConfig[4]}/>
        </ul>
      </div>
      <div className="footer-copyright">
        <p> &copy; {new Date().getFullYear()} {BRAND_NAME}. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
