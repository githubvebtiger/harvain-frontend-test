import Visa from '../assets/icons/payments/visa-color.svg';
import Mastercard from '../assets/icons/payments/mastercard-color.svg';
import Maestro from '../assets/icons/payments/maestro-color.svg';
import Skrill from '../assets/icons/payments/skrill-color.svg';
import GooglePay from '../assets/icons/payments/google-pay-color.svg';
import Payeer from '../assets/icons/payments/payeer-color.svg';
import PayPal from '../assets/icons/payments/paypal-color.svg';
import Advcash from '../assets/icons/payments/advcash-color.svg';
import Netteller from '../assets/icons/payments/netteller-color.svg';
import Swift from '../assets/icons/payments/swift-color.svg';
import Mir from '../assets/icons/payments/mir.svg';
import TetherUsdtTrc20 from '../assets/icons/payments/tether-usdt-trc20.svg';
import TetherUsdtBep20 from '../assets/icons/payments/tether-usdt-bep20.svg';

export enum TransactionStatus {
    'In progress' = 1,
    'Success',
    'Cancelled',
}

export const PaymentSystems = [
    Visa,
    Mastercard,
    Maestro,
    Skrill,
    GooglePay,
    Payeer,
    PayPal,
    Advcash,
    Netteller,
    Swift,
    Mir,
    TetherUsdtTrc20,
    TetherUsdtBep20
];
