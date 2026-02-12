import React from 'react';
import './styles.scss'
import Header from '../../components/Header';
import Cooperation from './components/Cooperation';
import Advantages from './components/Advantages';
import Join from '../../components/Join';
import Footer from '../../components/Footer'

import PricingTable from './components/PricingTable';
import Support from './components/Support';
import Start from './components/Start';
import { useTheme } from '../../provider/ThemeProvider';


type Props = {}
export default function HomePage(props: Props) {
  const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  return (
      <>
      <Header showNav={true} absolute/>
      <Start/>
      <div className='home-page-wrapper'>
        <div className="container home-page">
          <Support/>
          <Cooperation/>
          <Advantages/>
          <PricingTable/>
          <Join/>
        </div>
        <Footer/>
      </div>
    </>
  )
}
