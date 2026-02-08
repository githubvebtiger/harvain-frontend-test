import React from 'react';
import './styles.scss';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

type StatusType = 'success' | 'danger' | 'warning';

interface StatusBannerProps {
    type?: StatusType;
    heading: string;
    message: string;
    icon?: React.ReactNode;
    ctaLabel?: string;
    onCtaClick?: () => void;
    disabled?: boolean;
  }

const defaultIcons = {
  success: <CheckCircle size={20} className="status-icon success" />,
  danger: <AlertCircle size={20} className="status-icon danger" />,
  warning: <AlertTriangle size={20} className="status-icon warning" />
};

export const StatusBanner: React.FC<StatusBannerProps> = ({
    type = 'warning',
    heading,
    message,
    icon,
    ctaLabel,
    onCtaClick,
    disabled = false,
}) => {
  const iconToRender = icon || defaultIcons[type];

  const bannerClasses = `status-banner ${type} ${disabled ? 'disabled' : ''}`;

  return (
    <div className={bannerClasses}>
      <div className="status-icon">{iconToRender}</div>
      <div className="content">
        <div className="heading">{heading}</div>
        <div className="message">{message}</div>
      </div>
      {ctaLabel && (
        <button className="cta-button" onClick={onCtaClick} disabled={disabled}>
          {ctaLabel}
        </button>
      )}
    </div>
  );
};