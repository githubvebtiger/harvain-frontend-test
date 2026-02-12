import React, { useEffect, useState } from 'react';
import './styles.scss'
import { Link } from 'react-router-dom';

import { LogoIcon ,LogoDarkIcon  } from '../../assets';
import ChangeThemeButton from './components/ChangeThemeButton';
import HeaderNav from './components/HeaderNav';
import AuthNav from './components/AuthNav';
import useWindowWidth from '../../hooks/useWindowWidth';
import BurgerMenu from '../BurgerMenu';
import { useTheme } from '../../provider/ThemeProvider';
import { ROUTES } from '../Navigation';


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
      <a href={ROUTES.HOME} className="logo-link" onClick={() => window.location.href = ROUTES.HOME}>
        <img src={theme==='dark'? LogoDarkIcon:LogoIcon} alt="logoIcon"/>
      </a>
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
