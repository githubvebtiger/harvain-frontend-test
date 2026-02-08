import { useNavigate } from 'react-router-dom';
import Button from '../../components/UI/Button';
import { ROUTES } from '../../components/Navigation';
import checkIcon from '../../assets/icons/check.svg'
import './styles.scss';

const VerifiedPage = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    // Check if logged in as satellite or client
    const satelliteData = localStorage.getItem('satellite');
    if (satelliteData) {
      // Logged in as satellite - go to profile
      navigate(ROUTES.PROFILE);
    } else {
      // Logged in as client - go to satellites list
      navigate(ROUTES.SATELLITES);
    }
  };

  return (
    <div className="verified-page">
      <div className="verified-container">
        <div className="content">
          <div className="icon-container">
            <img src={checkIcon} alt="success" className="icon" />
          </div>
          <p className="message ">Email address successfully verified!</p>
          <Button onClick={handleProceed} label="Proceed to dashboard" />
        </div>
      </div>
    </div>
  );
};

export default VerifiedPage;