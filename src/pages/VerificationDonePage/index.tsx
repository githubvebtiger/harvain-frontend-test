import { useEffect, useState } from 'react';
import './styles.scss';

const VerificationDonePage = () => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Try to close the tab automatically
    // window.close() only works on tabs opened via window.open()
    window.close();
    
    // If window.close() didn't work (some browsers block it), show the message
    const timer = setTimeout(() => {
      setShowMessage(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="verification-done-page">
      <div className="verification-done-container">
        <div className="verification-done-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              stroke="#22C55E"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2>Verification Submitted</h2>
        <p className="verification-done-text">
          Your verification data has been submitted successfully.
        </p>
        {showMessage && (
          <div className="verification-done-notice">
            <p>You can safely close this tab and return to the previous window.</p>
            <button 
              className="verification-done-close-btn"
              onClick={() => window.close()}
            >
              Close this tab
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationDonePage;
