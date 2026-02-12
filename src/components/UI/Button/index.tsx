import React from 'react';
import './styles.scss'

export enum EButtonType {
  BUTTON_PRIMARY = 'primary',
  BUTTON_SECONDARY = 'secondary',
  BUTTON_GRAY = 'gray',
}

type ButtonProps = {
  label: string;
  onClick: () => void;
  variant?: EButtonType;
  disabled?: boolean;
  icon?: string;
  fullWidth?: boolean;
};

const Button: React.FC<ButtonProps> = ({label, onClick, variant = EButtonType.BUTTON_PRIMARY, disabled = false, icon, fullWidth}) => {
  const buttonClass = variant === EButtonType.BUTTON_PRIMARY
    ? 'button-primary'
    : variant === EButtonType.BUTTON_SECONDARY
      ? 'button-secondary'
      : 'button-gray';

  return (
    <button
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
      style={{width: fullWidth ? '100%' : 'auto'}}
    >
      {label}
      {icon && <img src={icon} alt="icon"/>}
    </button>
  );
};

export default Button;
