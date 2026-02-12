import React, { useState, useRef, useEffect } from "react";
import { countries } from "countries-list";
import "./styles.scss";
import Input from "../Input";

type Props = {
  value: string;
  placeholder: string;
  onCountrySelect: (value: string) => void;
  onCountryChange?: (value: string) => void;
  errorMessage?: string | null;
  disabled?: boolean;
};

export default function CountrySelect({
  value,
  placeholder,
  onCountrySelect,
  onCountryChange,
  errorMessage,
  disabled,
}: Props) {
  const [active, setActive] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<{
    name: string;
    code: string;
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleCountrySelect = (name: string, code: string) => {
    setSelectedCountry({ name, code: code.toLowerCase() });
    onCountrySelect(code.toLowerCase());
    setActive(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setActive(false);
    }
  };

  useEffect(() => {
    if (value) {
      const country = (countries as any)[value.toUpperCase()];
      if (country) {
        setSelectedCountry({ name: country.name, code: value.toLowerCase() });
      }
    } else {
      setSelectedCountry(null);
    }
  }, [value]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sortedCountries = Object.entries(countries)
    .filter(([_, country]) =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      a[1].name.toLowerCase().localeCompare(b[1].name.toLowerCase())
    );

  return (
    <div className="input-wrapper-custom">
      <div
        ref={dropdownRef}
        className={`countries-dropdown ${active ? "active" : ""}`}
      >
        <div
          onClick={disabled ? () => {} : () => setActive(!active)}
          style={{ cursor: "pointer", zIndex: 10 }}
        >
          <Input
            disabled={disabled}
            placeholder={placeholder}
            value={selectedCountry?.name || ""}
            endIcon={
              selectedCountry
                ? `https://media.api-sports.io/flags/${selectedCountry.code}.svg`
                : ""
            }
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedCountry({
                name: e.target.value,
                code: selectedCountry?.code || "",
              });
            }}
          />
        </div>
        {active && (
          <div className="countries-dropdown__dropdown">
            {sortedCountries.map(([code, country]) => (
              <div
                key={code}
                className="countries-dropdown__dropdown-item"
                onClick={() => handleCountrySelect(country.name, code)}
              >
                <img
                  loading="lazy"
                  src={`https://media.api-sports.io/flags/${code.toLowerCase()}.svg`}
                  alt={`${country.name} flag`}
                />
                <p className="title">{country.name}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
}
