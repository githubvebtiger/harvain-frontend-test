import React from 'react';

interface Props {
  color?: string;
}

const DashboardIcon: React.FC<Props> = ({ color = '#4B5563' }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="2"/>
      <rect x="13" y="3" width="8" height="8" rx="2" stroke={color} strokeWidth="2"/>
      <rect x="3" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth="2"/>
      <rect x="13" y="13" width="8" height="8" rx="2" stroke={color} strokeWidth="2"/>
    </svg>
  );
};

export default DashboardIcon;
