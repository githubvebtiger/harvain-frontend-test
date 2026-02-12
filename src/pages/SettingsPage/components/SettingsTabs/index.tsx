import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import { ROUTES } from '../../../../components/Navigation';

type Props = {};

export default function SettingsTabs(props: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('');

  const onHandleActiveTab = (value: string) => {
    setActiveTab(value);
  };

  useEffect(() => {
    if (activeTab) {
      navigate(`${ROUTES.SETTINGS}/${activeTab}`);
    }
  }, [activeTab]);

  useEffect(() => {
    const path = location.pathname.split('/')[2];
    setActiveTab(path);
  }, [location.pathname]);

  return (
    <div className="settings-tabs">
      <button
        className={`settings-tab ${activeTab === 'personal-info' ? 'active' : ''}`}
        onClick={() => onHandleActiveTab('personal-info')}
      >
        Personal Info
      </button>
      <button
        className={`settings-tab ${activeTab === 'change-password' ? 'active' : ''}`}
        onClick={() => onHandleActiveTab('change-password')}
      >
        Change Password
      </button>
    </div>
  );
}
