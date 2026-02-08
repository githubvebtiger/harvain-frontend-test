import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import PersonalInfo from './components/PersonalInfo';
import ChangePassword from './components/ChangePassword';
import WrapperPage from '../../components/WrapperPage';
import SettingsTabs from './components/SettingsTabs';
import { useTheme } from '../../provider/ThemeProvider';
import './styles.scss'
import Header from '../../components/Header';

export const SettingsPage = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');


  useEffect(() => {
    const path = location.pathname.split('/')[2];
    setActiveTab(path);
  }, [location.pathname]);
  const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  return (
    <div className="settings-wrapper">
      <div className="hide-on-mobile">
        <Header disableContainer isAuth/>
      </div>
      <WrapperPage>
        <div className="settings-page">
          <div className="page-header">
            <h2>Settings</h2>
            <p className="subtitle">Manage your account preferences and security</p>
          </div>
          <SettingsTabs/>
          <div className="settings-content">
            {activeTab === 'personal-info' && <PersonalInfo/>}
            {activeTab !== 'personal-info' && <ChangePassword/>}
          </div>
        </div>
      </WrapperPage>
    </div>
  );
};


