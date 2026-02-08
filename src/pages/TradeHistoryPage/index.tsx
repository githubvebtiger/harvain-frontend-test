import React, { useEffect, useState } from 'react';
import './styles.scss';
import WrapperPage from '../../components/WrapperPage';
import { useTheme } from '../../provider/ThemeProvider';
import { fetchTrades } from '../../api/fetchTrades';
import Header from '../../components/Header';
import EmptyState from '../../components/EmptyState';
import { SkeletonTradeItem } from '../../components/Skeleton';

type TradeData = {
  opened: string;
  closed: string;
  traiding_pair: string;
  exchange: string;
  tp_sl: string;
  fee: string;
  direction: string;
  deposit: string;
  closing_pnl: string;
  orders_type: string;
  opening_fee: string;
  closing_fee: string;
};

function TradeCard({
  opened,
  closed,
  traiding_pair,
  tp_sl,
  fee,
  direction,
  deposit,
  closing_pnl,
  orders_type,
  opening_fee,
  closing_fee,
}: Omit<TradeData, 'exchange'>) {
  const isProfitable = parseFloat(closing_pnl) >= 0;

  return (
    <div className="trade-card">
      {/* Header — pair + direction + P&L */}
      <div className="trade-card-header">
        <div className="trade-card-left">
          <span className="pair-name">{traiding_pair}</span>
          <span className={`direction-badge ${direction.toLowerCase()}`}>
            {direction}
          </span>
        </div>
        <span className={`pnl-value ${isProfitable ? 'positive' : 'negative'}`}>
          {isProfitable && !closing_pnl.startsWith('+') && !closing_pnl.startsWith('-') ? '+' : ''}{closing_pnl}
        </span>
      </div>

      {/* Details grid 4x2 */}
      <div className="trade-card-details">
        <div className="detail-field">
          <span className="field-label">Deposit</span>
          <span className="field-value white">{deposit}</span>
        </div>
        <div className="detail-field">
          <span className="field-label">Opened</span>
          <span className="field-value">{opened}</span>
        </div>
        <div className="detail-field">
          <span className="field-label">Closed</span>
          <span className="field-value">{closed}</span>
        </div>
        <div className="detail-field">
          <span className="field-label">TP / SL</span>
          <span className="field-value">{tp_sl}</span>
        </div>
        <div className="detail-field">
          <span className="field-label">Orders Type</span>
          <span className="field-value">{orders_type}</span>
        </div>
        <div className="detail-field">
          <span className="field-label">Commission</span>
          <span className="field-value">{fee}</span>
        </div>
        <div className="detail-field">
          <span className="field-label">Opening Fee</span>
          <span className="field-value">{opening_fee}</span>
        </div>
        <div className="detail-field">
          <span className="field-label">Closing Fee</span>
          <span className="field-value">{closing_fee}</span>
        </div>
      </div>
    </div>
  );
}

export default function TradeHistoryPage() {
  const [trades, setTrades] = useState<TradeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const loadTrades = async () => {
      try {
        setLoading(true);
        const data = await fetchTrades();
        setTrades(data);
      } catch (error) {
        console.error('Failed to load trades:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    loadTrades();
  }, []);

  return (
    <div className="trade-history-page-wrapper">
      <div className="hide-on-mobile">
        <Header disableContainer isAuth />
      </div>
      <WrapperPage>
        <div className="trade-history-page">
          <div className="page-header">
            <h2>Trade History</h2>
            <p className="subtitle">Your completed trading operations</p>
          </div>

          {loading && (
            <div className="trade-cards-list">
              {[1, 2, 3].map((i) => (
                <SkeletonTradeItem key={i} />
              ))}
            </div>
          )}

          {!loading && trades.length === 0 && (
            <EmptyState
              icon="trades"
              title="No trades yet"
              description="Your trading history will appear here once you start trading"
            />
          )}

          {!loading && trades.length > 0 && (
            <div className="trade-cards-list">
              {trades.map((item, index) => (
                <TradeCard
                  key={index}
                  opened={new Date(item.opened).toLocaleString()}
                  closed={new Date(item.closed).toLocaleString()}
                  traiding_pair={item.traiding_pair}
                  tp_sl={item.tp_sl}
                  fee={item.fee}
                  direction={item.direction}
                  deposit={item.deposit}
                  closing_pnl={item.closing_pnl}
                  orders_type={item.orders_type}
                  opening_fee={item.opening_fee}
                  closing_fee={item.closing_fee}
                />
              ))}
            </div>
          )}
        </div>
      </WrapperPage>
    </div>
  );
}
