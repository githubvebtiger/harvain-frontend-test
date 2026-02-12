import React, { useState } from 'react';
import './styles.scss';
import { LogoIcon, LogoDarkIcon } from '../../assets';
import ChangeThemeButton from '../Header/components/ChangeThemeButton'; 
import { useTheme } from '../../provider/ThemeProvider';

type Props = {
  children: React.ReactNode;
};

export default function BurgerMenu(props: Props) {
  const [active, setActive] = useState(false);

  const onHandleActive = () => {
    setActive((prevState) => !prevState);
  };
  const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'

  return (
    <div className="burger-menu">
      <div className={`burger-menu-btn ${active ? 'active' : ''}`} onClick={onHandleActive}>
        <span></span><span></span><span></span>
      </div>

      <div className={`burger-menu-content ${active ? 'active' : ''}`}>
        <div className="burger-menu-header">
          <img src={theme==='dark'?  LogoDarkIcon: LogoIcon} height={41} width={38} alt="Logo" />
          <div className={`burger-menu-btn ${active ? 'active' : ''}`} onClick={onHandleActive}>
            <span></span><span></span><span></span>
          </div>
        </div>

        

        {props.children}
        <div className="theme-toggle burger-menu-theme">
          <ChangeThemeButton />
        </div>
      </div>
    </div>
  );
}
