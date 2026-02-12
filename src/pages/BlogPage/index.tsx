import React from 'react';
import './styles.scss'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Join from '../../components/Join';
import Search from './components/Search';
import News from './components/News';
import { useTheme } from '../../provider/ThemeProvider';

type Props = {}
export default function BlogPage(props: Props) {
    const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  return (
    <>
      <div className='blog-page-wrapper'>
      <div className=" blog">
        <Header showNav/>
        <div className="container">
        <Search/>
        <News/>
        <Join/>
      </div>
      </div>
      <Footer/>
      </div>
    </>
  )
}
