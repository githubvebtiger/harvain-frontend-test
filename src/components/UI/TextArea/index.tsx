import React from 'react';
import './styles.scss';

type Props = {
  value?: string;
  onChange?: (e: any) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  required?: boolean;
  startIcon?: string;
  startIconOnClick?: () => void;
  endIcon?: string;
  endIconOnClick?: () => void;
  minHeight?: number;
  errorMessage?: string | null;
};

export default function TextArea({
                                   value,
                                   onChange,
                                   placeholder,
                                   type = 'text',
                                   name,
                                   id,
                                   required = false,
                                   startIcon,
                                   endIcon,
                                   startIconOnClick,
                                   endIconOnClick,
                                   minHeight,
                                   errorMessage
                                 }: Props) {
  return (
    <div>
      <div className="control-textarea">
        {startIcon && <img height={20} width={20} onClick={startIconOnClick} src={startIcon} alt="endIcon"/>}
        <textarea
          value={value}
          style={{minHeight: minHeight}}
          // onChange={}
          placeholder={placeholder}
          // type={type}
          onChange={(e) => onChange && onChange(e)}
          name={name}
          id={id}
          required={required}
        />
        {endIcon && <img height={20} width={20} onClick={endIconOnClick} src={endIcon} alt="endIcon"/>}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
