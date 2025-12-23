import React, { useState } from "react";
import "./styles.scss";
import ModalWrapper from "../ModalWrapper";
import Input from "../../UI/Input";
import PasswordInput from "../../UI/PasswordInput";
import Button from "../../UI/Button";
import { authenticateUser } from "../../../api/userApi";
import * as Yup from "yup";
import { validateForm } from "../../../utils/validation/validateForm";
import { getSatelliteToken } from "../../../api/satellites";
import { ROUTES } from "../../Navigation";
import { useAuth } from "../../../provider/AuthProvider";

type Props = {
  onClose: () => void;
  uuid?: any;
  navigate: any;
};

export default function LoginModal(props: Props) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Схема валидации
  const validationSchema = Yup.object().shape({
    // email: Yup.string().email('Invalid email format').required('Email is required'),
    email: Yup.string()
      .min(2, "Invalid Login")
      .required("Login is required"),
    password: Yup.string()
      .min(8, "Password must be between 8 and 30 characters")
      .max(30, "Password must be between 8 and 30 characters")
      .matches(
        /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d_]{8,30}$/,
        "Password must contain at least one uppercase letter, one digit, only Latin characters, and underscores"
      )
      .required("Password is required"),
  });

  async function onLogin() {
    setError(null);

    const formData = { email, password };

    const setErrorHandlers = {
      email: setEmailError,
      password: setPasswordError,
    };

    const isValid = await validateForm(
      validationSchema,
      formData,
      setErrorHandlers
    );

    if (!isValid) return;

    if (props.uuid) {
      const onLogin = (email: string, password: string) => {
        getSatelliteToken({
          username: email,
          password: password,
          uuid: props.uuid,
        }).then((data) => {
          if (
            data?.data?.status === 200 &&
            typeof data?.data?.data !== "string"
          ) {
            // Save client tokens before overwriting with satellite tokens
            const currentAccessToken = localStorage.getItem('accessToken');
            const currentRefreshToken = localStorage.getItem('refreshToken');
            if (currentAccessToken) {
              localStorage.setItem('clientAccessToken', currentAccessToken);
            }
            if (currentRefreshToken) {
              localStorage.setItem('clientRefreshToken', currentRefreshToken);
            }

            // Save satellite tokens to localStorage for axiosClient interceptor
            const satelliteData = data?.data?.data;
            const tokens = satelliteData?.tokens;
            if (tokens?.access) {
              localStorage.setItem('accessToken', tokens.access);
            }
            if (tokens?.refresh) {
              localStorage.setItem('refreshToken', tokens.refresh);
            }

            props.navigate(ROUTES.PROFILE);
            props.onClose();
          } else if (
            data?.data?.status === 302 ||
            typeof data?.data?.data === "string"
          ) {
            setPasswordError(
              "Invalid data. Please check your information and try again."
            );
          } else if (data?.error?.response?.data?.detail) {
            setPasswordError(data?.error?.response?.data?.detail);
          }
        });
      };
      onLogin(email, password);
    } else {
      try {
        const response = await authenticateUser(email, password);

        if (response.data) {
          login();
          props.navigate("/satellites");
          props.onClose();
        } else {
          // Безопасно извлекаем сообщение об ошибке с fallback
          const errorMessage = response.error?.response?.data?.detail ||
                              'Invalid username or password. Please check your credentials and try again.';
          setPasswordError(errorMessage);
        }
      } catch (e) {
        console.log(e);
        setPasswordError("Failed to login. Please try again later.");
      }
    }
  }

  return (
    <ModalWrapper onClose={props.onClose}>
      <div className="login-modal">
        <h2>
          <span>Log in</span>{" "}
          {!props.uuid ? "your account" : "to your satellite"}
        </h2>
        <div className="form">
          <Input
            placeholder="Login"
            type="text"
            value={email}
            errorMessage={emailError}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            value={password}
            errorMessage={passwordError}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="error-message">{error}</div>}
          <Button label="Login" onClick={onLogin} fullWidth />
        </div>
      </div>
    </ModalWrapper>
  );
}
