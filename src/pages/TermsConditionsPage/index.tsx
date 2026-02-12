import React from 'react';
import './styles.scss'
import Overview from './components/overview';
import Header from '../../components/Header';
import MainTermsConditions from './components/mainTermsConditions'
import Join from '../../components/Join'
import Footer from '../../components/Footer'
import { useTheme } from '../../provider/ThemeProvider';

type Props = {}
export default function TermsConditionsPage(props: Props) {
  const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  return (
    <div className='terms-page-wrapper'>
    
      <Header showNav={true}/>
      <div className="container">
      
      <div className="terms_conditions">
        <h1 className="terms_conditions-title"> Terms & Conditions </h1>
        <Overview/>
        <MainTermsConditions/>
        </div>
          <Join/>

      </div>

      <Footer/>

    </div>
    
  )
}
