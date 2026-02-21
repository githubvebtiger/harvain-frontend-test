import React, { useState, useRef } from 'react';
import './styles.scss';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: string | null;
};

export default function CustomDatePicker({
  value = '',
  onChange,
  placeholder = 'DD-MM-YYYY',
  disabled = false,
  errorMessage,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Convert internal YYYY-MM-DD to display DD-MM-YYYY
  const toDisplay = (val: string): string => {
    if (!val) return '';
    const match = val.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (match) return `${match[3]}-${match[2]}-${match[1]}`;
    return val;
  };

  // Convert display DD-MM-YYYY to internal YYYY-MM-DD
  const toInternal = (val: string): string => {
    const match = val.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (match) return `${match[3]}-${match[2]}-${match[1]}`;
    return val;
  };

  const [displayValue, setDisplayValue] = useState(toDisplay(value));

  // Sync if value prop changes externally
  React.useEffect(() => {
    setDisplayValue(toDisplay(value));
  }, [value]);

  const autoFormat = (raw: string): string => {
    // Remove non-digits
    const digits = raw.replace(/\D/g, '');
    let formatted = '';
    
    for (let i = 0; i < digits.length && i < 8; i++) {
      if (i === 2 || i === 4) formatted += '-';
      formatted += digits[i];
    }
    
    return formatted;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = autoFormat(e.target.value);
    setDisplayValue(formatted);

    // Only call onChange with valid complete date
    if (formatted.match(/^\d{2}-\d{2}-\d{4}$/)) {
      const internal = toInternal(formatted);
      onChange?.(internal);
    } else if (formatted === '') {
      onChange?.('');
    }
  };

  return (
    <div className='custom-date-picker input-wrapper-custom'>
      <div className='date-input-wrapper'>
        <input
          ref={inputRef}
          type="text"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={10}
          inputMode="numeric"
        />
      </div>
      {errorMessage && <p className='error-message'>{errorMessage}</p>}
    </div>
  );
}
