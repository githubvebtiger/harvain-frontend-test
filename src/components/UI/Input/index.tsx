import React from "react";
import "./styles.scss";

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  readOnly?: boolean;
  id?: string;
  required?: boolean;
  startIcon?: string;
  startIconOnClick?: () => void;
  endIcon?: string;
  endIconOnClick?: () => void;
  disabled?: boolean;
  onClick?: () => void;
  errorMessage?: string | null;
  className?: string;
  label?: string;
};

export default function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  name,
  id,
  readOnly = false,
  required = false,
  startIcon,
  endIcon,
  startIconOnClick,
  endIconOnClick,
  disabled = false,
  onClick,
  errorMessage,
  className,
  label,
}: Props) {
  return (
    <div className="input-wrapper-custom">
      {label && <label className="input-label">{label}</label>}
      <div className="control-input" onClick={onClick}>
        {startIcon && (
          <img
            height={20}
            width={20}
            onClick={startIconOnClick}
            src={startIcon}
            alt="endIcon"
          />
        )}
        <input
          className={className}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          name={name}
          id={id}
          required={required}
        />
        {endIcon && (
          <img
            height={20}
            width={20}
            onClick={endIconOnClick}
            src={endIcon}
            alt="endIcon"
          />
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
