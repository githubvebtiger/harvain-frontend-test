import React from 'react';
import './styles.scss';
import { MoonIcon, MoonIconTheme, WhiteMoonIcon, SunnerIconTheme } from '../../../../assets';
import { useTheme } from '../../../../provider/ThemeProvider';

type Props = {};
type ThemeType = 'dark' | 'light';

export default function ChangeThemeButton(props: Props) {
  const { theme, setTheme } = useTheme();

  function handleChangeTheme(targetTheme: ThemeType) {
    setTheme(targetTheme); 
  }

  return (
    <div className='theme-navbar'>
      <div
        className={`change_theme is-active-theme ${theme === 'dark' ? 'active-theme' : ''}`}
        onClick={() => handleChangeTheme('dark')}
      >
        <img src={theme === 'dark' ? WhiteMoonIcon : MoonIcon} alt="Dark theme icon" />
      </div>

      <div
        className={`change_theme is-active-theme ${theme === 'light' ? 'active-theme' : ''}`}
        onClick={() => handleChangeTheme('light')}
      >
        <img src={theme === 'dark' ? MoonIconTheme : SunnerIconTheme} alt="Light theme icon" />
      </div>
    </div>
  );
}
