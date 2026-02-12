import React, { useState } from "react";
import "./styles.scss";
import ModalWrapper from "../ModalWrapper";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import PhoneInput from "../../UI/PhoneInput";
import PasswordInput from "../../UI/PasswordInput";
import CountrySelect from "../../UI/CountrySelect";
import { registerClient } from "../../../api/userApi";
import { useModal } from "../../../provider/ModalContext";
import * as Yup from "yup";
import { validateForm } from "../../../utils/validation/validateForm";
import MakePaymentModal from "../MakePaymentModal";
import PricingModal from "../PricingModal";
import { SessionStorageService } from "../../../utils/SessionStorageService";

type Props = {
  onClose: () => void;
};

export default function RegisterModal(props: Props) {
  const { openModal } = useModal();
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [surnameError, setSurnameError] = useState<string | null>(null);
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [countryError, setCountryError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const onHandleCountyCode = (value: string) => {
    setCountryCode(value);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    surname: Yup.string()
      .min(2, "Surname must be at least 2 characters")
      .required("Surname is required"),
    phone: Yup.string()
      .matches(/^\d{9,15}$/, "Phone must be 9 to 15 digits")
      .required("Phone is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    country: Yup.string().required("Country is required"),
    password: Yup.string()
      .min(8, "Password must be between 8 and 30 characters")
      .max(30, "Password must be between 8 and 30 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,30}$/,
        "Password must contain at least one uppercase letter, one digit, and only Latin characters"
      )
      .required("Password is required"),
  });

  async function onRegister() {
    const formData = {
      name,
      surname,
      phone,
      email,
      country,
      password,
    };

    const setErrorHandlers = {
      name: setNameError,
      surname: setSurnameError,
      phone: setPhoneError,
      email: setEmailError,
      country: setCountryError,
      password: setPasswordError,
    };

    const isValid = await validateForm(
      validationSchema,
      formData,
      setErrorHandlers
    );

    if (!isValid) return;

    const requestData = {
      username: name,
      full_name: surname,
      phone: countryCode + phone,
      email,
      country,
      password_visible: password,
    };

    try {
      await registerClient(requestData).then((response) => {
        if (response.data) {
          SessionStorageService.save("user_id", response.data.id);
          openModal(PricingModal, {});
        } else {
          setPasswordError("something wrong!");
        }
      });
    } catch {
      console.error("Registration failed");
    }
  }

  return (
    <ModalWrapper onClose={props.onClose}>
      <div className="register-modal">
        <h2>
          <span>Register</span> your account
        </h2>
        <div className="form">
          <Input
            placeholder="Name"
            value={name}
            errorMessage={nameError}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Surname"
            value={surname}
            errorMessage={surnameError}
            onChange={(e) => setSurname(e.target.value)}
          />
          <PhoneInput
            countryCode={countryCode}
            onChangeCode={onHandleCountyCode}
            placeholder="00 000 000 00"
            value={phone}
            errorMessage={phoneError}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            placeholder="Email address"
            type="email"
            value={email}
            errorMessage={emailError}
            onChange={(e) => setEmail(e.target.value)}
          />
          <CountrySelect
            onCountrySelect={(country) => setCountry(country)}
            placeholder="Country"
            value={country}
            errorMessage={countryError}
          />
          <PasswordInput
            value={password}
            errorMessage={passwordError}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button label="Register" onClick={onRegister} fullWidth />
        </div>
      </div>
    </ModalWrapper>
  );
}
