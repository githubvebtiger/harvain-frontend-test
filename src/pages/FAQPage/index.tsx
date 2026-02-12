import React from 'react';
import './styles.scss'
import Header from '../../components/Header';
import FAQSidebar from './components/FAQSidebar';
import FAQAnswers from './components/FAQAnswers';
import Join from '../../components/Join';
import Footer from '../../components/Footer';
import { useTheme } from '../../provider/ThemeProvider';

type Props = {}
export default function FAQPage(props: Props) {
    const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  return (
    <>
       <div className='faq-page-wrapper'>
      <div >
         <Header showNav/>
         <div className='container'>
        <div className="faq-page ">
          <FAQSidebar/>
          <FAQAnswers/>
        </div>
        <Join/>
        </div>
      </div>
      <Footer/>
      </div>
    </>
  )
}
