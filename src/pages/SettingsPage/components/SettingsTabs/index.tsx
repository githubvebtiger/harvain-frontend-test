import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles.scss';
import { ROUTES } from '../../../../components/Navigation';

type Props = {};
type TabProps = {
  title: string;
  isActive: boolean;
  onClick: () => void;
};

function Tab(props: TabProps) {
  return (
    <div className={`tab ${props.isActive ? 'active' : ''}`} onClick={props.onClick}>
      <h2>{props.title}</h2>
    </div>
  );
}

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
      <Tab
        title="Personal info"
        isActive={activeTab === 'personal-info'}
        onClick={() => onHandleActiveTab('personal-info')}
      />
      <Tab
        title="Change password"
        isActive={activeTab === 'change-password'}
        onClick={() => onHandleActiveTab('change-password')}
      />
    </div>
  );
}
