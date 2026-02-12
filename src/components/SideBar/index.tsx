import React, { useCallback, useEffect, useRef, useState } from 'react';
import './styles.scss';
import { CloseToggleSidebarIcon, LogoutIcon, OpenToggleSidebarIcon } from '../../assets';
import { sideBarParams } from './const';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../Navigation';
import Tooltip from '../Tooltip';
import { useTheme } from '../../provider/ThemeProvider';
import { routesConfig } from '../Navigation/const';
import { fetchSatellites } from '../../api/satellites';

type ISidebarItem = {
  icon: React.FC<any>;
  isActive: boolean;
  drawerOpen: boolean;
  title: string;
  onClick: () => void;
  showTooltip?: boolean;
  tooltipMessage?: string;
  tooltipType?: "success" | "danger" | "warning";
}

const SidebarItem: React.FC<ISidebarItem> = (props) => {
  return (
    <div className={`sidebar-item ${props.isActive && 'active'}`} onClick={props.onClick}>
      <div className="sidebar-item-content">
        <div className="icon">
          <props.icon color={props.isActive ? '#1A56DB' : '#4B5563'}/>
        </div>
        {props.drawerOpen && <p>{props.title}</p>}
        {props.showTooltip && props.drawerOpen && (
          <Tooltip 
            message={props.tooltipMessage || "Default message"} 
            type={props.tooltipType || "warning"} 
          />
        )}
      </div>
    </div>
  );
};

type Props = {
  isBurger?: boolean;
}

const Sidebar: React.FC<Props> = (props: Props) => {
  const location = useLocation()
  const navigate = useNavigate()
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [list, setList] = useState(sideBarParams);
  const [verificationStatus, setVerificationStatus] = useState<{
    verifyStatus: string;
  }>({
    verifyStatus: '',
  });
  const hasFetchedRef = useRef(false);
  
  const getTooltipConfig = () => {
    const { verifyStatus } = verificationStatus;
    
    if (verifyStatus === 'red') {
      return {
        show: true,
        type: 'danger' as const,
        message: 'Your account is not verified. Please complete your personal details and verify your email.'
      };
    } else if (verifyStatus === 'yellow') {
      return {
        show: true,
        type: 'warning' as const,
        message: 'Verification is incomplete. Please verify your documents.'
      };
    } else if (verifyStatus === 'green') {
      return {
        show: true,
        type: 'success' as const,
        message: 'Your account is fully verified.'
      };
    }
    
    return {
      show: false,
      type: 'warning' as const,
      message: ''
    };
  };
  
  useEffect(() => {
    if (hasFetchedRef.current) return;
    hasFetchedRef.current = true;
  
    const fetchVerificationStatus = async () => {
      try {
        const response = await fetchSatellites();
        if (response.data) {
          const userData = response.data;
          setVerificationStatus({
            verifyStatus: userData.verify_status || 'red',
          });
        }
      } catch (error) {
        console.error('Error fetching verification status:', error);
      }
    };
  
    const isAuthenticated = !!localStorage.getItem('refreshToken');
    if (isAuthenticated) {
      const satelliteData = localStorage.getItem('satellite');
      if (satelliteData) {
        try {
          const parsedData = JSON.parse(satelliteData);
          if (parsedData && typeof parsedData === 'object' && 'verify_status' in parsedData) {
            setVerificationStatus({
              verifyStatus: parsedData.verify_status || 'red',
            });
          } else {
            fetchVerificationStatus();
          }
        } catch (e) {
          console.error("Error parsing satellite data from localStorage", e);
          fetchVerificationStatus();
        }
      } else {
        fetchVerificationStatus();
      }
    }
  }, []);
  
  const onHandleClick = useCallback((id: string) => {
    const currentItem: any = list.find((item: any) => item.id === id)

    if (currentItem) {
      navigate(currentItem.path)
    }
  }, [list, navigate])
  
  useEffect(() => {
    setList(prevState => prevState.map((item: any) => {
      return location.pathname.includes(item.path) || location.pathname.includes(item?.path2)
        ? {...item, isActive: true}
        : {...item, isActive: false};
    }));
  }, [location.pathname]);
  
  const handleShowDrawer = () => {
    setDrawerOpen(prevState => !prevState)
  }

  const handleLogout = () => {
    // If on satellites page (main account) - full logout
    if (location.pathname === ROUTES.SATELLITES) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("clientRefreshToken");
      localStorage.removeItem("clientAccessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("satellite");
      localStorage.removeItem("loginId");
      navigate(ROUTES.HOME, { replace: true });
    } else {
      // If on satellite pages - logout from satellite only, go back to satellites list
      // Restore client tokens
      const clientAccessToken = localStorage.getItem("clientAccessToken");
      const clientRefreshToken = localStorage.getItem("clientRefreshToken");
      if (clientAccessToken) {
        localStorage.setItem("accessToken", clientAccessToken);
      }
      if (clientRefreshToken) {
        localStorage.setItem("refreshToken", clientRefreshToken);
      }
      localStorage.removeItem("clientAccessToken");
      localStorage.removeItem("clientRefreshToken");
      localStorage.removeItem("satellite");
      localStorage.removeItem("loginId");
      navigate(ROUTES.SATELLITES, { replace: true });
    }
  }
  
  const isAuthenticated = !!localStorage.getItem('refreshToken');

  useEffect(() => {
    const currentRoute = routesConfig.find(route => route.path === location.pathname);
    if (currentRoute?.isProtected && !isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [location.pathname, isAuthenticated, navigate]);
  
  const {theme} = useTheme()
  const isDarkTheme = theme === 'dark'
  
  const tooltipConfig = getTooltipConfig();
  
  return (
    <div className="dark-sidebar">
      <nav className={`sidebar ${drawerOpen ? 'open' : 'closed'} ${props.isBurger && 'isBurger'} `}>
        {!props.isBurger && <div className="sidebar-header">
          {drawerOpen && <h2>Menu</h2>}
            <div onClick={handleShowDrawer} className="pointer">
              {drawerOpen ? <OpenToggleSidebarIcon/> : <CloseToggleSidebarIcon/>}
            </div>
        </div>}
        <div className="sidebar-list">
          {list.map((item: any, index) => {
            if (item.id === 'divider') return <span key={index} className="divider"/>

            const showTooltip = item.id === 'profile' && tooltipConfig.show;
            
            return (
              <SidebarItem 
                key={index} 
                icon={item.icon} 
                isActive={item.isActive} 
                title={item.text}
                onClick={() => onHandleClick(item.id)} 
                drawerOpen={drawerOpen}
                showTooltip={showTooltip}
                tooltipMessage={tooltipConfig.message}
                tooltipType={tooltipConfig.type}
              />
            );
          })}
        </div>
        <div className="sidebar-footer" onClick={handleLogout}>
          <div className="logout-icon">
            <LogoutIcon/>
          </div>
          {drawerOpen && <p>Log out</p>}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;