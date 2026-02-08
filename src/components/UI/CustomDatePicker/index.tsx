import React from 'react';
import './styles.scss';
import DatePicker from 'react-multi-date-picker';

type Props = {
  value?: string;
  onChange?: (e:any) => void;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  required?: boolean;
  startIcon?: string;
  startIconOnClick?: () => void;
  endIcon?: string;
  endIconOnClick?: () => void;
  disabled?: boolean;
  onClick?: () => void;
  errorMessage?: string | null;
};

export default function CustomDatePicker({
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
                                disabled = false,
                                onClick,
                                errorMessage
                              }: Props) {
  return (
    <div className='custom-date-picker input-wrapper-custom'>
      <DatePicker value={value} shadow={false} inputMode={''} format={'YYYY-MM-DD'} onChange={onChange} disabled={disabled}/>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  );
}
