import HomePage from '../../pages/HomePage';
import BlogPage from '../../pages/BlogPage';
import FAQPage from '../../pages/FAQPage';
import ContactPage from '../../pages/ContactPage';
import PrivacyPolicyPage from '../../pages/PrivacyPolicyPage';
import TermsConditionsPage from '../../pages/TermsConditionsPage';
import ChooseYourPlanPage from '../../pages/ChooseYourPlanPage';

import SatellitesPage from '../../pages/SatellitesPage';
import ProfilePage from '../../pages/ProfilePage';
import { SettingsPage } from '../../pages/SettingsPage';
import WithdrawalRequisitiesPage from '../../pages/WithdrawalRequisitiesPage';
import TradeHistoryPage from '../../pages/TradeHistoryPage';
import RefillPage from '../../pages/RefillPage';
import WithdrawPage from '../../pages/WithdrawPage';
import VerifiedPage from '../../pages/VerifiedPage';
import DashboardPage from '../../pages/DashboardPage';
import DashboardPageCompact from '../../pages/DashboardPageCompact';
import AssetsPage from '../../pages/AssetsPage';
import StrategiesPage from '../../pages/StrategiesPage';


export const ROUTES = {
  HOME: '/',
  BLOG: '/blog',
  FAQ: '/FAQ',
  CONTACT: '/contact',
  PRIVACY_POLICY: '/privacy-policy',
  TERMS_CONDITIONS: '/terms-conditions',
  CHOOSE_YOUR_PLAN: '/choose-your-plan',

  DASHBOARD: '/dashboard',
  DASHBOARD_V2: '/dashboard-v2',
  ASSETS: '/assets',
  STRATEGIES: '/strategies',
  PROFILE: '/profile',
  SATELLITES: '/satellites',
  SETTINGS: '/settings',
  SETTINGS_PERSONAL_INFO: '/settings/personal-info',
  SETTINGS_CHANGE_PASSWORD: '/settings/change-password',
  WITHDRAWAL_REQUISITIES: '/requisities',
  TRADE_HISTORY: '/trade-history',
  REFILL: '/refill',
  WITHDRAW: '/withdraw',
  VERIFIED: '/verified',
  EMAIL_VERIFY: '/verify-email/:token/:hash'

};
export const routesConfig = [
  {
    path: ROUTES.HOME,
    component: HomePage,
    exact: true,
    isProtected: false,
  },
  {
    path: ROUTES.BLOG,
    component: BlogPage,
    isProtected: false,
  },
  {
    path: ROUTES.FAQ,
    component: FAQPage,
    isProtected: false,
  },
  {
    path: ROUTES.CONTACT,
    component: ContactPage,
    isProtected: false,
  },
  {
    path: ROUTES.PRIVACY_POLICY,
    component: PrivacyPolicyPage,
    isProtected: false,
  },
  {
    path: ROUTES.TERMS_CONDITIONS,
    component: TermsConditionsPage,
    isProtected: false,
  },
  {
    path: ROUTES.CHOOSE_YOUR_PLAN,
    component: ChooseYourPlanPage,
    isProtected: false,
  },
  {
    path: ROUTES.DASHBOARD,
    component: DashboardPage,
    isProtected: true,
  },
  {
    path: ROUTES.DASHBOARD_V2,
    component: DashboardPageCompact,
    isProtected: true,
  },
  {
    path: ROUTES.ASSETS,
    component: AssetsPage,
    isProtected: true,
  },
  {
    path: ROUTES.STRATEGIES,
    component: StrategiesPage,
    isProtected: true,
  },
  {
    path: ROUTES.PROFILE,
    component: ProfilePage,
    isProtected: true,
  },
  {
    path: ROUTES.SATELLITES,
    component: SatellitesPage,
    isProtected: true,
  },
  {
    path: ROUTES.SETTINGS,
    component: SettingsPage,
    isProtected: true,
  },
  {
    path: ROUTES.SETTINGS_PERSONAL_INFO,
    component: SettingsPage,
    isProtected: true,
  },
  {
    path: ROUTES.SETTINGS_CHANGE_PASSWORD,
    component: SettingsPage,
    isProtected: true,
  },
  {
    path: ROUTES.WITHDRAWAL_REQUISITIES,
    component: WithdrawalRequisitiesPage,
    isProtected: true,
  },
  {
    path: ROUTES.TRADE_HISTORY,
    component: TradeHistoryPage,
    isProtected: true,
  },
  {
    path: ROUTES.REFILL,
    component: RefillPage,
    isProtected: true,
  },
  {
    path: ROUTES.WITHDRAW,
    component: WithdrawPage,
    isProtected: true,
  },
  {
    path: ROUTES.VERIFIED,
    component: VerifiedPage,
    isProtected: false,
  },

];
