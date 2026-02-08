import React, { useState } from 'react';
import Input from '../Input';
import { PasswordHideIcon, PasswordShowIcon, DarkPasswordClose,DarkPasswordOpen } from '../../../assets';
import { useTheme } from '../../../provider/ThemeProvider';

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  required?: boolean;
  placeholder?: string;
  errorMessage?: string | null;
  label?: string;
};

export default function PasswordInput({
                                        value,
                                        onChange,
                                        name,
                                        id,
                                        required = false,
                                        placeholder,
                                        errorMessage,
                                        label,
                                      }: Props) {
  const [showPassword, setShowPassword] = useState(false)

  function handleShowPassword() {
    setShowPassword(prevState => !prevState)
  }
    const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  return (
    <Input value={value}
           errorMessage={errorMessage}
           onChange={onChange}
           name={name} id={id}
           required={required}
           placeholder={placeholder || 'Password'}
           label={label}
           endIcon={
            showPassword
              ? (isDarkTheme ? DarkPasswordClose  : PasswordHideIcon)
              : (isDarkTheme ? DarkPasswordOpen :  PasswordShowIcon)
          }
           endIconOnClick={handleShowPassword}
           type={showPassword ? 'text' : 'Password'}
    />

  );
}
