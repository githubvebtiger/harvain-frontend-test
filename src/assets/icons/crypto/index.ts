import BtcIcon from './btc.svg';
import EthIcon from './eth.svg';
import AltcoinsIcon from './altcoins.svg';
import StablecoinsIcon from './stablecoins.svg';
import UsdIcon from './usd.svg';
import UsdtIcon from './usdt.svg';

export {
  BtcIcon,
  EthIcon,
  AltcoinsIcon,
  StablecoinsIcon,
  UsdIcon,
  UsdtIcon,
};

// Маппинг названий активов к иконкам
export const cryptoIconMap: Record<string, string> = {
  'BTC': BtcIcon,
  'Bitcoin': BtcIcon,
  'ETH': EthIcon,
  'Ethereum': EthIcon,
  'Altcoins': AltcoinsIcon,
  'Stablecoins': StablecoinsIcon,
  'USD': UsdIcon,
  'USDT': UsdtIcon,
  'USDC': StablecoinsIcon,
  'USDT TRC20': UsdtIcon,
  'USDT (TRC20)': UsdtIcon,
  'USDT BEP-20': UsdtIcon,
  'USDT (BEP-20)': UsdtIcon,
};
