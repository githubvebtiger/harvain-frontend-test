import React, { useState, useEffect } from 'react';
import './styles.scss';

interface EmailVerificationPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSendVerification: (email: string) => Promise<void>;
  defaultEmail?: string;
}

interface SatelliteData {
  id: number;
  uuid: string;
  username: string;
  name: string;
  city: string;
  country: string;
  active_balance: number;
  address: string;
  allow_password_update: boolean;
  block_balance: number;
  born: string;
  email: string;
  invitation_code: string;
  last_name: string;
  phone: string;
  tokens: any;
  withdrawal: number;
  verify_status:string
}

const EmailVerificationPopup: React.FC<EmailVerificationPopupProps> = ({
  isOpen,
  onClose,
  onSendVerification,
  defaultEmail = ''
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Load email from localStorage on component mount and when popup opens
  useEffect(() => {
    if (isOpen) {
      const satelliteData = localStorage.getItem('satellite');
      if (satelliteData) {
        try {
          const parsedData: SatelliteData = JSON.parse(satelliteData);
          if (parsedData.email) {
            setEmail(parsedData.email);
          }
        } catch (error) {
          console.error('Error parsing satellite data from localStorage:', error);
          // Fallback to defaultEmail if localStorage parsing fails
          setEmail(defaultEmail);
        }
      } else {
        // Fallback to defaultEmail if no satellite data in localStorage
        setEmail(defaultEmail);
      }
    }
  }, [isOpen, defaultEmail]);

  const handleSendLetter = async () => {
    if (!email) {
      setError('No email address found');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Invalid email address format');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await onSendVerification(email);
      setSuccess(true);

      // Auto-close after 2 seconds
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (error: any) {
      setError(error?.response?.data?.message || 'Failed to send verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleClose = () => {
    if (!isLoading) {
      setError('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="email-verification-overlay">
      <div className="email-verification-popup">
        <div className="popup-header">
          <h3>Confirm your email address</h3>
          <button
            className="close-button"
            onClick={handleClose}
            disabled={isLoading || success}
          >
            ×
          </button>
        </div>

        <div className="popup-content">
          {success ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <p className="success-text">Verification email sent successfully!</p>
              <p className="success-subtext">Please check your inbox at {email}</p>
            </div>
          ) : (
            <>
              <p className="popup-description">
                To activate your account, follow the link sent to your email address.
              </p>

              <div className="email-input-container">
                <input
                  id="email-address"
                  type="email"
                  value={email}
                  placeholder="Email address from your profile"
                  disabled={true} // Always disabled since we're using email from localStorage
                  className={error ? 'error disabled' : 'disabled'}
                  readOnly
                />
                {error && <span className="error-message">{error}</span>}
              </div>

              <button
                className="send-letter-button"
                onClick={handleSendLetter}
                disabled={isLoading || !email}
              >
                {isLoading ? 'Sending...' : 'Send a letter'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPopup;