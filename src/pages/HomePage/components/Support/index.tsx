import React from 'react';
import './styles.scss'
import {  IllustrationDarkIcon, IllustrationIcon } from '../../../../assets';
import { useTheme } from '../../../../provider/ThemeProvider';
import { BRAND_NAME } from '../../../../constants';


type Props = {}
export default function OurInterest(props: Props) {
 const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  return (
   <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
    <section className="our-interest">
      <div className="left">
        <h1>Driven by <span>Expertise</span>, Open to All </h1>
        <p>At {BRAND_NAME}, we understand the journey every trader embarks on, from the foundation of learning to the mastery of the craft.
          Whether you're a beginner or a seasoned pro, our platform is designed to support you at every stage.</p>
        <p>{BRAND_NAME} is your partner in navigating the challenges and unlocking your full potential in the trading world.</p>
      </div>
      <div className="right">
        <img src={ isDarkTheme ? IllustrationDarkIcon : IllustrationIcon } alt="IllustrationImg"/>
      </div>
      
    </section>
   </div>
  )
}
