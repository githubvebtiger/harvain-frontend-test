import React from "react";
import "./styles.scss";
import { PaymentSystems } from "../../utils/choices";

// TRC20 иконка (TRON - красный кружок)
const UsdtTrc20Icon = () => (
  <svg className="usdt-icon-svg" viewBox="0 0 60.65 52.77">
    <path fill="#50af95" fillRule="evenodd" d="M11.11.26.05,23.49A.46.46,0,0,0,.14,24L30,52.64a.45.45,0,0,0,.63,0L60.51,24a.44.44,0,0,0,.1-.53L49.55.26A.44.44,0,0,0,49.14,0H11.52a.44.44,0,0,0-.41.26Z"/>
    <path fill="#fff" fillRule="evenodd" d="M34.17,25.88c-.22,0-1.33.08-3.8.08-2,0-3.36-.06-3.85-.08-7.6-.34-13.27-1.66-13.27-3.24s5.67-2.91,13.27-3.25v5.17c.5,0,1.92.12,3.89.12,2.35,0,3.54-.1,3.75-.12V19.4c7.58.33,13.24,1.66,13.24,3.24s-5.66,2.9-13.24,3.23Zm0-7V14.24H44.74v-7H15.94v7.05H26.52v4.62c-8.6.4-15.06,2.1-15.06,4.14s6.46,3.74,15.06,4.14V42h7.64V27.13c8.58-.39,15-2.09,15-4.13s-6.45-3.74-15-4.14Z"/>
    <circle fill="#ff312d" cx="45.48" cy="41.11" r="11.34"/>
    <path fill="#fff" d="M52.9,39.24c-.68-.63-1.61-1.58-2.37-2.26l-.05,0a.77.77,0,0,0-.25-.14h0c-1.84-.34-10.4-1.94-10.57-1.92a.24.24,0,0,0-.13,0l0,0a.76.76,0,0,0-.12.19v.22c1,2.68,4.77,11.47,5.52,13.53,0,.14.13.41.29.42h0c.08,0,.45-.48.45-.48s6.53-7.93,7.19-8.77a1.78,1.78,0,0,0,.23-.33A.55.55,0,0,0,52.9,39.24Zm-5.56.92,2.78-2.31,1.64,1.51ZM46.25,40l-4.8-3.93,7.77,1.43Zm.44,1,4.91-.79L46,47ZM40.8,36.47l5.05,4.29L45.12,47Z"/>
  </svg>
);

// BEP-20 иконка (Binance - жёлтый кружок)
const UsdtBep20Icon = () => (
  <svg className="usdt-icon-svg" viewBox="0 0 60.65 52.77">
    <path fill="#50af95" fillRule="evenodd" d="M11.11.26.05,23.49A.46.46,0,0,0,.14,24L30,52.64a.45.45,0,0,0,.63,0L60.51,24a.44.44,0,0,0,.1-.53L49.55.26A.44.44,0,0,0,49.14,0H11.52a.44.44,0,0,0-.41.26Z"/>
    <path fill="#fff" fillRule="evenodd" d="M34.17,25.88c-.22,0-1.33.08-3.8.08-2,0-3.36-.06-3.85-.08-7.6-.34-13.27-1.66-13.27-3.24s5.67-2.91,13.27-3.25v5.17c.5,0,1.92.12,3.89.12,2.35,0,3.54-.1,3.75-.12V19.4c7.58.33,13.24,1.66,13.24,3.24s-5.66,2.9-13.24,3.23Zm0-7V14.24H44.74v-7H15.94v7.05H26.52v4.62c-8.6.4-15.06,2.1-15.06,4.14s6.46,3.74,15.06,4.14V42h7.64V27.13c8.58-.39,15-2.09,15-4.13s-6.45-3.74-15-4.14Z"/>
    <circle fill="#f3ba2c" cx="45.48" cy="40.83" r="11.34"/>
    <polygon fill="#fff" points="50.34 43.88 50.34 43.88 45.48 48.74 40.61 43.88 40.61 43.88 42.4 42.09 42.4 42.09 45.48 45.17 48.55 42.09 50.34 43.88"/>
    <polygon fill="#fff" points="50.34 37.78 48.55 39.57 45.48 36.49 42.4 39.57 40.61 37.78 45.48 32.91 50.34 37.78"/>
    <rect fill="#fff" x="50.34" y="39.57" width="2.53" height="2.53" transform="translate(-13.76 48.45) rotate(-45)"/>
    <rect fill="#fff" x="38.09" y="39.56" width="2.53" height="2.53" transform="translate(-17.35 39.78) rotate(-45)"/>
    <path fill="#fff" d="M47.29,40.83h0L45.48,39l-1.35,1.34h0l-.15.16-.32.32h0l1.82,1.81,1.81-1.81h0"/>
  </svg>
);

// Generic card icon
const CardGenericIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
    <rect x="2" y="5" width="20" height="14" rx="2.5" stroke="#6B7280" strokeWidth="1.5"/>
    <line x1="2" y1="10" x2="22" y2="10" stroke="#6B7280" strokeWidth="1.5"/>
    <rect x="5" y="14" width="6" height="2" rx="1" fill="#6B7280" opacity="0.4"/>
  </svg>
);

// Маппинг ID платёжной системы → названия
export const PaymentSystemNames: Record<number, string> = {
  1: 'Visa',
  2: 'Mastercard',
  3: 'Maestro',
  4: 'Skrill',
  5: 'Google Pay',
  6: 'Payeer',
  7: 'PayPal',
  8: 'Advcash',
  9: 'Neteller',
  10: 'Swift',
  11: 'MIR',
  12: 'USDT',
  13: 'USDT',
};

// Определяем сеть для USDT
export const getNetworkInfo = (iconId: number): { network: string; networkClass: string } | null => {
  if (iconId === 12) return { network: 'TRC20', networkClass: 'trc20' };
  if (iconId === 13) return { network: 'BEP-20', networkClass: 'bep20' };
  return null;
};

// Определяем тип иконки по строке payment system
export const getIconTypeFromString = (paymentSystem: string): 'trc20' | 'bep20' | 'img' => {
  const s = paymentSystem.toLowerCase();
  if (s.includes('trc20')) return 'trc20';
  if (s.includes('bep-20') || s.includes('bep20')) return 'bep20';
  return 'img';
};

// Получить индекс PaymentSystems по строке
const getPaymentSystemIndex = (paymentSystem: string): number => {
  const s = paymentSystem.toLowerCase();
  if (s.includes('visa')) return 0;
  if (s.includes('mastercard')) return 1;
  if (s.includes('maestro')) return 2;
  if (s.includes('skrill')) return 3;
  if (s.includes('google')) return 4;
  if (s.includes('payeer')) return 5;
  if (s.includes('paypal')) return 6;
  if (s.includes('advcash')) return 7;
  if (s.includes('neteller') || s.includes('netteller')) return 8;
  if (s.includes('swift')) return 9;
  if (s.includes('mir')) return 10;
  return -1;
};

interface PaymentIconProps {
  // Либо iconId (для Payment Methods), либо paymentSystem строка (для Refill/Withdraw)
  iconId?: number;
  paymentSystem?: string;
}

export default function PaymentIcon({ iconId, paymentSystem }: PaymentIconProps) {
  // По iconId (Payment Methods page)
  if (iconId !== undefined) {
    if (iconId === 12) {
      return <div className="icon-box"><UsdtTrc20Icon /></div>;
    }
    if (iconId === 13) {
      return <div className="icon-box"><UsdtBep20Icon /></div>;
    }
    if (PaymentSystems[iconId - 1]) {
      return (
        <div className="icon-box">
          <img src={PaymentSystems[iconId - 1]} alt={PaymentSystemNames[iconId] || 'Payment'} className="icon-img" />
        </div>
      );
    }
    return <div className="icon-box"><CardGenericIcon /></div>;
  }

  // По paymentSystem строке (Refill/Withdraw pages)
  if (paymentSystem) {
    const iconType = getIconTypeFromString(paymentSystem);
    if (iconType === 'trc20') {
      return <div className="icon-box"><UsdtTrc20Icon /></div>;
    }
    if (iconType === 'bep20') {
      return <div className="icon-box"><UsdtBep20Icon /></div>;
    }
    const idx = getPaymentSystemIndex(paymentSystem);
    if (idx >= 0 && PaymentSystems[idx]) {
      return (
        <div className="icon-box">
          <img src={PaymentSystems[idx]} alt={paymentSystem} className="icon-img" />
        </div>
      );
    }
    return <div className="icon-box"><CardGenericIcon /></div>;
  }

  return <div className="icon-box"><CardGenericIcon /></div>;
}
