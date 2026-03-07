import React, { useEffect, useState } from 'react';
import './styles.scss'
import { Link } from 'react-router-dom';
import Sidebar from '../SideBar';
import { LogoDarkIcon, LogoIcon } from '../../assets';
import BurgerMenu from '../BurgerMenu';
import useWindowWidth from '../../hooks/useWindowWidth';
import { useTheme } from '../../provider/ThemeProvider';
import { ROUTES } from '../Navigation';
import { fetchSatelliteById } from '../../api/satellites';

type Props = {
  children: React.ReactNode;
}
export default function WrapperPage(props: Props) {
  const {theme} = useTheme()
  const [isMobile, setIsMobile] = useState(false)
  const {windowWidth} = useWindowWidth();

  useEffect(() => {
    // Check if satellite is blocked on every satellite-level page load
    // clientAccessToken exists = we're logged into a satellite (client tokens backed up)
    const loginId = localStorage.getItem('loginId');
    const clientAccessToken = localStorage.getItem('clientAccessToken');
    if (loginId && clientAccessToken) {
      fetchSatelliteById(Number(loginId)).catch(() => {
        // fetchSatelliteById handles blocked redirect internally
      });
    }
  }, []);

  useEffect(() => {
    if (windowWidth < 880) {
      setIsMobile(true)
    } else setIsMobile(false)
  }, [windowWidth])
  return (
    <div className="page">
      <div className="header-flex">
        {isMobile && <Link to={ROUTES.HOME} className="logo-link"><img src={theme === 'dark' ? LogoDarkIcon : LogoIcon} alt="logoIcon"/></Link>}
        {isMobile && <BurgerMenu>
            <Sidebar isBurger/>
        </BurgerMenu>}
      </div>
      <div className="content-flex">
        <Sidebar/>
        <div className="page-wrapper">
          {props.children}
        </div>
      </div>
    </div>

  )
}
