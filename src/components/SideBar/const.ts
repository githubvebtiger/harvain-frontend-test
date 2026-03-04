import { ProfileIcon, RefillIcon, SettingsIcon, TradeHistoryIcon, WithdrawalIcon, WithdrawIcon, DashboardIcon } from '../../assets';

export type IconItem = {
  id: string;
  text: string;
  icon: React.FC<any>;
  isActive: boolean;
  path: string;
  path2?: string;
};

export const sideBarParams: (IconItem | { id: string })[] = [
  {
    id: 'dashboard',
    text: 'Dashboard',
    icon: DashboardIcon,
    isActive: false,
    path: '/dashboard'
  },
  {
    id: 'profile',
    text: 'Profile',
    icon: ProfileIcon,
    isActive: false,
    path: '/profile'
  },
  {
    id: 'settings',
    text: 'Settings',
    icon: SettingsIcon,
    isActive: false,
    path: '/settings/personal-info',
    path2: '/settings/change-password'
  },
  {
    id: 'withdrawal',
    text: 'Payment Methods',
    icon: WithdrawalIcon,
    isActive: false,
    path: '/requisities'
  },
  {
    id: 'divider'
  },
  {
    id: 'refill',
    text: 'Refill',
    icon: RefillIcon,
    isActive: false,
    path: '/refill'
  },
  {
    id: 'withdraw',
    text: 'Withdraw',
    icon: WithdrawIcon,
    isActive: false,
    path: '/withdraw'
  },
  {
    id: 'divider'
  },
  {
    id: 'history',
    text: 'Trade History',
    icon: TradeHistoryIcon,
    isActive: false,
    path: '/trade-history'
  },
];
