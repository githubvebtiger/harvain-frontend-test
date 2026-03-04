import React, { useState, useRef, useEffect } from "react";
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
import axiosClient from "../../../api/axiosClient";

type Props = {
  onClose: () => void;
  uuid?: any;
  navigate: any;
};

type BlockedState = {
  blocked: boolean;
  canVerify: boolean;
  documentVerified: boolean;
  message: string;
};

export default function LoginModal(props: Props) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [blockedState, setBlockedState] = useState<BlockedState | null>(null);
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(false);
  const [verificationPending, setVerificationPending] = useState(false);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  function startPolling() {
    if (pollingRef.current) clearInterval(pollingRef.current);
    
    pollingRef.current = setInterval(async () => {
      try {
        const response = await axiosClient.post('/api/frontend/satellite/blocked-verification-status/', {
          uuid: props.uuid,
          username: email,
          password: password,
        });
        
        const data = response.data;
        
        if (data.document_verified && !data.blocked) {
          // Verification successful + auto-unblocked
          if (pollingRef.current) clearInterval(pollingRef.current);
          setVerificationPending(false);
          setVerificationSuccess(true);
        } else if (data.document_verified && data.blocked) {
          // Verified but still blocked (was verified before) — shouldn't happen in this flow
          if (pollingRef.current) clearInterval(pollingRef.current);
          setVerificationPending(false);
          setBlockedState(prev => prev ? {
            ...prev,
            documentVerified: true,
            canVerify: false,
            message: "Please contact technical support"
          } : null);
        }
      } catch {
        // Silently ignore polling errors
      }
    }, 5000); // Poll every 5 seconds
  }

  const validationSchema = Yup.object().shape({
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

  async function handleStartVerification() {
    setVerificationLoading(true);
    setError(null);
    try {
      const response = await axiosClient.post('/api/frontend/satellite/start-blocked-verification/', {
        uuid: props.uuid,
        username: email,
        password: password,
      });

      if (response.data?.session_url) {
        window.open(response.data.session_url, '_blank');
        setVerificationPending(true);
        startPolling();
      }
    } catch (err: any) {
      const detail = err?.response?.data?.detail || "Failed to start verification. Please try again.";
      setError(detail);
    } finally {
      setVerificationLoading(false);
    }
  }

  async function handleLoginAfterVerification() {
    // Try logging in after successful verification
    const result = await getSatelliteToken({
      username: email,
      password: password,
      uuid: props.uuid,
    });

    if (
      result?.data?.status === 200 &&
      typeof result?.data?.data !== "string"
    ) {
      const currentAccessToken = localStorage.getItem('accessToken');
      const currentRefreshToken = localStorage.getItem('refreshToken');
      if (currentAccessToken) {
        localStorage.setItem('clientAccessToken', currentAccessToken);
      }
      if (currentRefreshToken) {
        localStorage.setItem('clientRefreshToken', currentRefreshToken);
      }

      const satelliteData = result?.data?.data;
      const tokens = satelliteData?.tokens;
      if (tokens?.access) {
        localStorage.setItem('accessToken', tokens.access);
      }
      if (tokens?.refresh) {
        localStorage.setItem('refreshToken', tokens.refresh);
      }

      props.navigate(ROUTES.PROFILE);
      props.onClose();
    } else {
      setError("Login failed. Please try again.");
    }
  }

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
      getSatelliteToken({
        username: email,
        password: password,
        uuid: props.uuid,
      }).then((data) => {
        if (
          data?.data?.status === 200 &&
          typeof data?.data?.data !== "string"
        ) {
          const currentAccessToken = localStorage.getItem('accessToken');
          const currentRefreshToken = localStorage.getItem('refreshToken');
          if (currentAccessToken) {
            localStorage.setItem('clientAccessToken', currentAccessToken);
          }
          if (currentRefreshToken) {
            localStorage.setItem('clientRefreshToken', currentRefreshToken);
          }

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
        } else if (data?.error?.response?.status === 401 && data?.error?.response?.data?.blocked) {
          const respData = data.error.response.data;
          setBlockedState({
            blocked: true,
            canVerify: respData.can_verify ?? false,
            documentVerified: respData.document_verified ?? false,
            message: respData.detail || "Account is blocked",
          });
        } else if (data?.error?.response?.data?.detail) {
          setPasswordError(data?.error?.response?.data?.detail);
        }
      });
    } else {
      try {
        const response = await authenticateUser(email, password);

        if (response.data) {
          login();
          props.navigate("/satellites");
          props.onClose();
        } else {
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

  // Verification success UI
  if (verificationSuccess) {
    return (
      <ModalWrapper onClose={() => {
        props.onClose();
        props.navigate('/satellites');
      }}>
        <div className="login-modal verification-success-modal">
          <div className="success-icon">
            <div className="success-icon-circle">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <h2>Verification Successful</h2>
          <p className="success-message">
            Your identity has been verified and your account has been unblocked.
          </p>
          <div className="blocked-actions">
            <Button
              label="Continue to Account"
              onClick={handleLoginAfterVerification}
              fullWidth
            />
          </div>
        </div>
      </ModalWrapper>
    );
  }

  // Blocked state UI
  if (blockedState) {
    return (
      <ModalWrapper onClose={() => {
        if (pollingRef.current) clearInterval(pollingRef.current);
        props.onClose();
        props.navigate('/satellites');
      }}>
        <div className="login-modal blocked-modal">
          <div className="blocked-icon">
            <div className="blocked-icon-circle">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="#EF4444" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
          <h2>Account Blocked</h2>
          <p className="blocked-message">
            Identity verification is required to access your satellite account
          </p>
          
          {error && <div className="error-message">{error}</div>}

          {verificationPending ? (
            <div className="blocked-actions">
              <div className="verification-pending">
                <div className="pending-spinner" />
                <p className="pending-text">
                  Waiting for verification to complete...
                </p>
                <p className="pending-subtext">
                  Complete the verification in the opened tab. This page will update automatically.
                </p>
              </div>
            </div>
          ) : blockedState.canVerify && !blockedState.documentVerified ? (
            <div className="blocked-actions">
              <Button
                label={verificationLoading ? "Starting..." : "Start Verification"}
                onClick={handleStartVerification}
                fullWidth
              />
            </div>
          ) : (
            <div className="blocked-actions">
              <div className="support-notice">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p className="support-text">
                  Please contact technical support to resolve this issue
                </p>
              </div>
            </div>
          )}
        </div>
      </ModalWrapper>
    );
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
