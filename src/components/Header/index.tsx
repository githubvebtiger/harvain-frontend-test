import React, { useEffect, useState } from 'react';
import './styles.scss'

import { LogoIcon ,LogoDarkIcon  } from '../../assets';
import ChangeThemeButton from './components/ChangeThemeButton';
import HeaderNav from './components/HeaderNav';
import AuthNav from './components/AuthNav';
import useWindowWidth from '../../hooks/useWindowWidth';
import BurgerMenu from '../BurgerMenu';
import { useTheme } from '../../provider/ThemeProvider';


type Props = {
  showNav?: boolean;
  isAuth?: boolean;
  showLogout?: boolean;
  absolute?: boolean;
  disableContainer?: boolean; //add props
}

export default function Header(props: Props) {
  const [isMobile, setIsMobile] = useState(false)
  const {windowWidth} = useWindowWidth();

  useEffect(() => {
    if (windowWidth < 880) {
      setIsMobile(true)
    } else setIsMobile(false)
  }, [windowWidth])
    const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  return (
    //add props
    <div className={`${props.disableContainer ? 'no-container' : 'container'} header ${props.absolute && 'absolute'}`}>
      <img src={theme==='dark'? LogoDarkIcon:LogoIcon} alt="logoIcon"/>
      {props.showNav && !isMobile && <HeaderNav/>}
      {props.showLogout && !isMobile && <AuthNav/>}
      {!isMobile && <ChangeThemeButton/>}
      {isMobile && (
        <BurgerMenu>
          {props.showNav && <HeaderNav/>}
        </BurgerMenu>
      )}
    </div>
  )
}
