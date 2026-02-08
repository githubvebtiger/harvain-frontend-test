import React from 'react';
import './styles.scss'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Join from '../../components/Join';
import HeaderPart from './components/HeaderPart';
import DetailsPart from './components/DetailsPart';
import { useTheme } from '../../provider/ThemeProvider';

type Props = {}
export default function ContactPage(props: Props) {
     const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  return (
    <>

    <div className='contact-page-wrapper'>
        <Header showNav/>
        <div className="container">
        <HeaderPart/>
        <DetailsPart/>
        <Join/>
      </div>
      <Footer/>
      </div>
    </>
  )
}
