import React, { useEffect, useState } from 'react';
import './styles.scss'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Button, { EButtonType } from '../../components/UI/Button';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '../../provider/ThemeProvider';
import { ROUTES } from '../../components/Navigation';
import { fetchSatelliteById, fetchSatellites, getSatelliteToken } from '../../api/satellites';
import { useModal } from '../../provider/ModalContext';
import LoginModal from '../../components/Modals/LoginModal';
import EmptyState from '../../components/EmptyState';

type Props = {}
type SatelliteData = {
  id: number;
  uuid: string;
  block_balance: number;
  active_balance: number;
  withdrawal: number;
  order: any;
};

// Skeleton для карточек сателлитов
const SkeletonCard = () => (
  <div className="satellite-card skeleton">
    <div className="skeleton-uuid"></div>
    <div className="skeleton-balance"></div>
    <div className="skeleton-balance"></div>
    <div className="skeleton-balance"></div>
    <div className="skeleton-btn"></div>
  </div>
);

// SVG Arrow Icons
const ArrowDownIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <polyline points="19 12 12 19 5 12" />
  </svg>
);

const ArrowUpIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="19" x2="12" y2="5" />
    <polyline points="5 12 12 5 19 12" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7 7 17 7 17 17" />
  </svg>
);

const SatelliteCards = ({ data, loading }: { data: SatelliteData[], loading: boolean }) => {
  const { openModal } = useModal();
  const navigate = useNavigate();

  const onHandleLogin = (id: number, uuid: string) => {
    fetchSatelliteById(id);
    openModal(LoginModal, { uuid, navigate });
  };

  if (loading) {
    return (
      <div className="satellites-cards fade-in">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <EmptyState
        icon="satellites"
        title="No satellites yet"
        description="Your satellite accounts will appear here once they are created"
      />
    );
  }

  return (
    <div className="satellites-cards fade-in">
      {/* Column Headers */}
      <div className="satellites-header">
        <span className="header-cell">UUID</span>
        <span className="header-cell center">Block Balance</span>
        <span className="header-cell center">Active Balance</span>
        <span className="header-cell center">Withdrawal</span>
        <span className="header-cell"></span>
      </div>

      {/* Rows */}
      {data.map((satellite) => (
        <div key={satellite.id} className="satellite-card">
          <div className="card-uuid">{satellite.uuid}</div>
          <div className="card-balance center">
            {satellite.block_balance > 0 ? (
              <span className="value-with-icon">
                <span className="value block">${satellite.block_balance.toLocaleString()}</span>
                <ArrowDownIcon />
              </span>
            ) : (
              <span className="value empty">$0</span>
            )}
          </div>
          <div className="card-balance center">
            {satellite.active_balance > 0 ? (
              <span className="value-with-icon">
                <span className="value active">${satellite.active_balance.toLocaleString()}</span>
                <ArrowUpIcon />
              </span>
            ) : (
              <span className="value empty">$0</span>
            )}
          </div>
          <div className="card-balance center">
            {satellite.withdrawal > 0 ? (
              <span className="value-with-icon">
                <span className="value withdraw">${satellite.withdrawal.toLocaleString()}</span>
                <ArrowUpRightIcon />
              </span>
            ) : (
              <span className="value empty">$0</span>
            )}
          </div>
          <button 
            className="login-btn"
            onClick={() => onHandleLogin(satellite.id, satellite.uuid)}
          >
            Login
          </button>
        </div>
      ))}
    </div>
  );
};

// Mobile Card компонент
const MobileSatelliteCards = ({ data, loading }: { data: SatelliteData[], loading: boolean }) => {
  const { openModal } = useModal();
  const navigate = useNavigate();

  const onHandleLogin = (id: number, uuid: string) => {
    fetchSatelliteById(id);
    openModal(LoginModal, { uuid, navigate });
  };

  if (loading) {
    return (
      <div className="mobile-satellites-cards">
        {[1, 2, 3].map((i) => (
          <div key={i} className="mobile-satellite-card skeleton">
            <div className="skeleton-header"></div>
            <div className="skeleton-balances"></div>
            <div className="skeleton-btn"></div>
          </div>
        ))}
      </div>
    );
  }

  if (data.length === 0) {
    return null; // EmptyState уже показан выше
  }

  return (
    <div className="mobile-satellites-cards">
      {data.map((satellite) => (
        <div key={satellite.id} className="mobile-satellite-card">
          <div className="mobile-card-header">
            <div className="mobile-card-uuid">{satellite.uuid}</div>
            <div className="mobile-card-status">Active</div>
          </div>
          <div className="mobile-card-balances">
            <div className="mobile-balance">
              <div className="label">Block</div>
              <div className="value block">${satellite.block_balance.toLocaleString()}</div>
            </div>
            <div className="mobile-balance">
              <div className="label">Active</div>
              <div className="value active">${satellite.active_balance.toLocaleString()}</div>
            </div>
            <div className="mobile-balance">
              <div className="label">Withdraw</div>
              <div className="value">${satellite.withdrawal.toLocaleString()}</div>
            </div>
          </div>
          <button 
            className="mobile-login-btn"
            onClick={() => onHandleLogin(satellite.id, satellite.uuid)}
          >
            Login
          </button>
        </div>
      ))}
    </div>
  );
};

export default function SatellitesPage() {
  const [satellites, setSatellites] = useState<SatelliteData[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Restore client tokens if coming back from satellite
    const clientAccessToken = localStorage.getItem('clientAccessToken');
    const clientRefreshToken = localStorage.getItem('clientRefreshToken');
    if (clientAccessToken) {
      localStorage.setItem('accessToken', clientAccessToken);
      localStorage.removeItem('clientAccessToken');
    }
    if (clientRefreshToken) {
      localStorage.setItem('refreshToken', clientRefreshToken);
      localStorage.removeItem('clientRefreshToken');
    }
    // Clear satellite data
    localStorage.removeItem('satellite');
    localStorage.removeItem('loginId');

    setLoading(true);
    fetchSatellites()
      .then(data => {
        if (data?.data) {
          setSatellites(data.data.satellites || []);
          setTotalPrice(data.data.total_balance || 0);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <>
      <div className="satellities-page-wrapper">
        <Header isAuth showLogout />
        <div className="satellites-page container">
          <div className="balance fade-in-up">
            <p>Total balance:</p>
            <h2>${totalPrice.toLocaleString()}</h2>
          </div>
          
          {/* Desktop Cards */}
          <div className="desktop-only">
            <SatelliteCards data={satellites} loading={loading} />
          </div>
          
          {/* Mobile Cards */}
          <div className="mobile-only">
            <MobileSatelliteCards data={satellites} loading={loading} />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
