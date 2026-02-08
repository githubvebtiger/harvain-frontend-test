import React, { useEffect, useState, useRef } from "react";
import { countries } from "countries-list";
import "./styles.scss";
import { Globe } from "lucide-react";

type Props = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeCode?: (code: string) => void;
  placeholder?: string;
  name?: string;
  id?: string;
  required?: boolean;
  startIcon?: string;
  startIconOnClick?: () => void;
  endIcon?: string;
  endIconOnClick?: () => void;
  countryCode: string;
  errorMessage?: string | null;
  disabled?: boolean;
};

export const countryCodes: any[] = Object.entries(countries)
  .map(([code, country]) => {
    return {
      code: country.phone,
      dialCode: country.phone,
      name: country.name,
      icon: `https://media.api-sports.io/flags/${code.toLowerCase()}.svg`,
      alpha2Code: code,
    };
  })
  .sort((a, b) => a.name.localeCompare(b.name));

export default function PhoneInput({
  value,
  onChange,
  onChangeCode,
  placeholder,
  name,
  id,
  required = false,
  startIcon,
  endIcon,
  startIconOnClick,
  endIconOnClick,
  countryCode,
  errorMessage,
  disabled,
}: Props) {
  const [showCountries, setShowCountries] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCode);
  const countryRef = useRef<HTMLDivElement>(null);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputVal = e.target.value.replace(/\D/g, "");
    const formatted = inputVal.replace(
      /(\d{2})(\d{3})(\d{3})(\d{2})(\d{2})/,
      "$1 $2 $3 $4 $5"
    );
    onChange && onChange({ ...e, target: { ...e.target, value: formatted } });
  };

  useEffect(() => {
    onChangeCode && onChangeCode(selectedCountry);
  }, [selectedCountry, onChangeCode]);
  useEffect(() => {
    countryCode && setSelectedCountry(countryCode);
  }, [countryCode]);
  const handleCountrySelect = (code: string) => {
    setSelectedCountry(code);
    setShowCountries(false);
  };

  const currentCountry = countryCodes.find(
    (item) => item.alpha2Code.toLowerCase() === selectedCountry.toLowerCase()
  );
  const handleClickOutside = (e: MouseEvent) => {
    if (countryRef.current && !countryRef.current.contains(e.target as Node)) {
      setShowCountries(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="input-wrapper-custom">
      <div className="control-input-phone" ref={countryRef}>
        <div
          className="country-select"
          onClick={
            !disabled ? () => setShowCountries(!showCountries) : undefined
          }
        >
          {startIcon && (
            <img
              height={20}
              width={20}
              onClick={startIconOnClick}
              src={startIcon}
              alt="flag"
              loading="lazy"
            />
          )}
          <span className="country-code">
            {currentCountry ? (
              <>
                <img
                  src={currentCountry.icon}
                  loading="lazy"
                  alt="country-flag"
                />
                <p>{`+${currentCountry.dialCode}`}</p>
              </>
            ) : (
              <>
                <Globe />
                <p>+ X</p>
              </>
            )}
          </span>

          {showCountries && (
            <ul className="country-list">
              {countryCodes.map((item) => (
                <li
                  key={item.alpha2Code}
                  className="country-code-item"
                  onClick={() => handleCountrySelect(item.alpha2Code)}
                >
                  <img src={item.icon} alt={`${item.name}`} loading="lazy" />
                  <p>{`+${item.dialCode}`}</p>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <input
          disabled={disabled}
          value={value}
          onChange={handlePhoneChange}
          placeholder={placeholder}
          type="tel"
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
            alt="end-icon"
            loading="lazy"
          />
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
