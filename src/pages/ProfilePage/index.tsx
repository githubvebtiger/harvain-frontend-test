import React, { useEffect, useState } from "react";
import "./styles.scss";
import WrapperPage from "../../components/WrapperPage";
import { getSatellite } from "../../utils/getDataFromLocalStore/satellite";
import Header from "../../components/Header";
import { fetchSatelliteById } from "../../api/satellites";
import { startEmailVerification } from "../../api/userApi";
import EmailVerificationPopup from "../../components/Modals/EmailVerificationModal";
import { startVerificationSession } from "../../api/userApi";
import { toast } from "../../components/Toast";
import { SkeletonProfileForm } from "../../components/Skeleton";

type Props = {};

export default function ProfilePage(props: Props) {
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [uuid, setUuid] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [documentVerified, setDocumentVerified] = useState(false);
  const [isEmailVerificationPopupOpen, setIsEmailVerificationPopupOpen] =
    useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        setLoading(true);
        const satelliteId = localStorage.getItem("loginId");

        if (satelliteId) {
          const sat = await fetchSatelliteById(Number(satelliteId));
          sat.country && setCountry(sat.country);
          sat.city && setCity(sat.city);
          sat.born && setBirthDate(sat.born);
          sat.address && setAddress(sat.address);
          sat.email && setEmail(sat.email);
          sat.phone && setPhoneNumber(sat.phone);
          sat.username && setUsername(sat.username);
          sat.uuid && setUuid(sat.uuid);
          setEmailVerified(sat.email_verified || false);
          setDocumentVerified(sat.document_verified || false);
        } else {
          const sat = getSatellite();
          if (sat) {
            sat.country && setCountry(sat.country);
            sat.city && setCity(sat.city);
            sat.born && setBirthDate(sat.born);
            sat.address && setAddress(sat.address);
            sat.phone && setPhoneNumber(sat.phone);
            sat.email && setEmail(sat.email);
            sat.username && setUsername(sat.username);
            sat.uuid && setUuid(sat.uuid);
            setEmailVerified(sat.email_verified || false);
            setDocumentVerified(sat.document_verified || false);
          }
        }
      } catch (error) {
        console.error("Error loading user data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadUserData();
  }, []);

  const handleEmailVerification = () => {
    if (!email) {
      toast.error("Please add your email address in Settings first.");
      return;
    }
    setIsEmailVerificationPopupOpen(true);
  };

  const handleSendEmailVerification = async (verificationEmail: string) => {
    try {
      const response = await startEmailVerification(verificationEmail);
      if (response?.data?.session_url) {
        window.location.href = response.data.session_url;
      } else if (response?.data) {
        if (verificationEmail !== email) {
          setEmail(verificationEmail);
        }
      }
    } catch (error: any) {
      console.error("Error starting email verification:", error);
      throw error;
    }
  };

  const handleKYCVerification = async () => {
    try {
      const response = await startVerificationSession();
      if (response?.data?.session_url) {
        window.location.href = response.data.session_url;
      } else {
        toast.error("Failed to start document verification. Please try again.");
      }
    } catch (error) {
      toast.error("Error starting document verification. Please try again.");
    }
  };

  const displayName = username ? username.replace(/_/g, " ") : "User";

  const steps = [
    {
      label: "Registration",
      perk: "Basic access",
      done: true,
      active: false,
      locked: false,
    },
    {
      label: "Email",
      perk: "Deposits",
      done: emailVerified,
      active: !emailVerified,
      locked: false,
    },
    {
      label: "KYC",
      perk: "Withdrawals",
      done: documentVerified,
      active: emailVerified && !documentVerified,
      locked: !emailVerified,
    },
  ];

  return (
    <div className="profile-page-wrapper">
      <div className="hide-on-mobile">
        <Header disableContainer isAuth />
      </div>
      <WrapperPage>
        <div className="profile-page">
          <div className="page-header fade-in">
            <h2>Profile</h2>
            <p className="subtitle">
              Your personal information and verification status
            </p>
          </div>

          {loading ? (
            <SkeletonProfileForm />
          ) : (
            <>
              {/* User Card */}
              <div className="user-card fade-in-up">
                <div className="user-card-glow" />
                <div className="user-card-avatar">
                  <svg width="27" height="27" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="9" r="3.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                    <path d="M5.5 20.5c0-3.3 3-5.5 6.5-5.5s6.5 2.2 6.5 5.5" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="user-card-info">
                  <div className="user-card-name">{displayName}</div>
                  <div className="user-card-meta">
                    <span className="user-card-uuid">{uuid || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="data-card fade-in-up">
                <div className="data-card-header">Personal Information</div>
                <div className="data-grid">
                  <div className="data-row">
                    <span className="data-label">Country</span>
                    <span className="data-value">{country || "—"}</span>
                  </div>
                  <div className="data-row border-right">
                    <span className="data-label">City</span>
                    <span className="data-value">{city || "—"}</span>
                  </div>
                </div>
                <div className="data-grid last">
                  <div className="data-row">
                    <span className="data-label">Date of Birth</span>
                    <span className="data-value mono">{birthDate || "—"}</span>
                  </div>
                  <div className="data-row border-right">
                    <span className="data-label">Address</span>
                    <span className="data-value">{address || "—"}</span>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="data-card fade-in-up">
                <div className="data-card-header">Contact Information</div>
                <div className="data-grid last">
                  <div className="data-row">
                    <span className="data-label">Phone</span>
                    <span className="data-value mono">{phoneNumber || "—"}</span>
                  </div>
                  <div className="data-row border-right">
                    <span className="data-label">Email</span>
                    <span className={`data-value mono ${!email ? "empty" : ""}`}>
                      {email || "Not provided"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Verification */}
              <div className="verification-card fade-in-up">
                <div className="verification-top">
                  <span className="verification-header">Verification</span>
                  <span className="verification-progress-label">
                    {steps.filter(s => s.done).length}/3 complete
                  </span>
                </div>

                {/* Progress bar */}
                <div className="verification-progress-bar">
                  <div
                    className="verification-progress-fill"
                    style={{ width: `${(steps.filter(s => s.done).length / 3) * 100}%` }}
                  />
                </div>

                {/* Compact cards */}
                <div className="verification-steps-row">
                  {steps.map((s, i) => (
                    <div
                      key={i}
                      className={`verification-step-card ${s.done ? "done" : ""} ${s.active ? "active" : ""} ${s.locked ? "locked" : ""}`}
                    >
                      <div className="step-card-circle">
                        {s.done ? (
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M5 13l4 4L19 7" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        ) : (
                          <span>{i + 1}</span>
                        )}
                      </div>
                      <div className="step-card-info">
                        <div className="step-card-label">{s.label}</div>
                        <div className="step-card-status">
                          {s.done ? "Done" : s.active ? "Pending" : "Locked"}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Current Action */}
                {!emailVerified && (
                  <div className="verification-action">
                    <div className="verification-action-text">
                      <span className="verification-action-desc">Confirm your email to continue</span>
                    </div>
                    <button className="verification-action-btn" onClick={handleEmailVerification}>
                      Verify →
                    </button>
                  </div>
                )}

                {emailVerified && !documentVerified && (
                  <div className="verification-action">
                    <div className="verification-action-text">
                      <span className="verification-action-desc">Verify your identity to unlock withdrawals</span>
                    </div>
                    <button className="verification-action-btn" onClick={handleKYCVerification}>
                      Verify →
                    </button>
                  </div>
                )}

                {emailVerified && documentVerified && (
                  <div className="verification-action complete">
                    <div className="verification-action-text">
                      <span className="verification-action-desc">You have full access to all platform features</span>
                    </div>
                    <span className="verification-complete-badge">✓</span>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </WrapperPage>

      <EmailVerificationPopup
        isOpen={isEmailVerificationPopupOpen}
        onClose={() => setIsEmailVerificationPopupOpen(false)}
        onSendVerification={handleSendEmailVerification}
        defaultEmail={email}
      />
    </div>
  );
}
