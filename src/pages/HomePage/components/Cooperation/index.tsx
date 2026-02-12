import React from 'react';
import './styles.scss'
import { Illustration2DarkIcon, Illustration2Icon } from '../../../../assets';
import { useTheme } from '../../../../provider/ThemeProvider';
import { BRAND_NAME } from '../../../../constants';

type Props = {

}
export default function Cooperation(props:Props){
  const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  return (
    <section className='cooperation'>
      <div className='left'>
        <img src={ isDarkTheme ? Illustration2DarkIcon : Illustration2Icon } alt="icon" />
      </div>
      <div className='right'>
        <h1 >Built by traders For everyone <br /> your <span>capital,</span> our trading ideas</h1>
        <p>
          {BRAND_NAME} believes that traders go through multiple levels in their careers, Student - Practitioner -
          Senior - Master, with FP's in house-built evaluation models and funded (Master), which's built to find
          trading talents while helping them get through their funding problems, by offering them the possibility to
          trade up $300.000.
        </p>
      </div>
    </section>
  )
}
