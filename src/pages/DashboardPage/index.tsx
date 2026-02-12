import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";
import WrapperPage from "../../components/WrapperPage";
import Header from "../../components/Header";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { fetchDashboardData, DashboardData, getBalanceFromSatellite, getSatelliteBalances, SatelliteBalances } from "../../api/dashboard";
import { fetchSatelliteById } from "../../api/satellites";
import { ReactComponent as CalendarIcon } from "../../assets/icons/calendar.svg";
import { useTheme } from "../../provider/ThemeProvider";

// ===== STRATEGIES WIDGET CONFIG =====
// Переключить между вариантами: 'compact' | 'with-chart'
const STRATEGIES_WIDGET_VARIANT: 'compact' | 'with-chart' = 'with-chart';

// ===== BALANCE STATUS CONFIG =====
// Переключить между вариантами: 'stepper' | 'progress'
const BALANCE_STATUS_VARIANT: 'stepper' | 'progress' = 'stepper';

// Mock данные стратегий (потом заменить на API)
const mockStrategies = [
  { id: '1', name: 'Арбитраж', allocation: 45, profitability: 24.5, color: '#3B82F6' },
  { id: '2', name: 'Spot Trading', allocation: 25, profitability: 18.2, color: '#22C55E' },
  { id: '3', name: 'Futures', allocation: 20, profitability: 31.8, color: '#F59E0B' },
  { id: '4', name: 'DeFi Yield', allocation: 10, profitability: 12.4, color: '#8B5CF6' },
];

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(value);
};

const formatPercent = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
};

export default function DashboardPage() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DashboardData | null>(null);
  const getDateRangeLabel = () => {
    if (!data || !data.chart_data.length) return '';
    const first = data.chart_data[0].date;
    const last = data.chart_data[data.chart_data.length - 1].date;
    if (!first || !last || first === last) return last || first || '';
    return `${first} — ${last}`;
  };
  const [strategies] = useState(mockStrategies);
  const [activeStrategyIndex, setActiveStrategyIndex] = useState<number | null>(null);
  const [satelliteBalances, setSatelliteBalances] = useState<SatelliteBalances>({ 
    block_balance: 0, 
    active_balance: 0, 
    withdrawal: 0 
  });

  // Theme-aware chart colors
  const chartColors = {
    grid: isDark ? '#1a1a3e' : '#E5E7EB',
    axis: isDark ? '#8C89B4' : '#6B7280',
    dotStroke: isDark ? '#0A1330' : '#FFFFFF',
    tooltipBg: isDark ? '#0A1330' : '#FFFFFF',
    tooltipBorder: isDark ? '#1a1a3e' : '#E5E7EB',
    tooltipColor: isDark ? '#fff' : '#111827',
  };

  // Данные для мини pie chart
  const pieData = strategies.map(s => ({ name: s.name, value: s.allocation, color: s.color }));

  const formatProfitability = (value: number): string => {
    const sign = value >= 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Refresh satellite data from API first
      const loginId = localStorage.getItem('loginId');
      if (loginId) {
        try {
          await fetchSatelliteById(Number(loginId));
        } catch (e) {
          console.warn('Could not refresh satellite data:', e);
        }
      }

      const dashboardData = await fetchDashboardData();
      const realBalance = getBalanceFromSatellite();
      if (realBalance > 0) {
        dashboardData.stats.balance = realBalance;
      }
      setData(dashboardData);
      
      // Загружаем балансы satellite
      const balances = getSatelliteBalances();
      setSatelliteBalances(balances);
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const tooltipStyle = {
    background: chartColors.tooltipBg,
    border: `1px solid ${chartColors.tooltipBorder}`,
    borderRadius: 8,
    color: chartColors.tooltipColor,
    padding: "12px 16px",
    boxShadow: isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 4px 20px rgba(0,0,0,0.1)',
  };

  // Определяем текущий статус на основе балансов
  const getActiveStep = (): 'block' | 'active' | 'withdrawal' => {
    if (satelliteBalances.withdrawal > 0) return 'withdrawal';
    if (satelliteBalances.active_balance > 0) return 'active';
    return 'block';
  };

  const getChartData = () => {
    if (!data) return [];
    return data.chart_data.map((item) => ({
      month: item.date,
      value: item.value,
      fullDate: item.fullDate || item.date,
    }));
  };

  if (loading) {
    return (
      <div className="dashboard-page-wrapper">
        <div className="hide-on-mobile">
          <Header disableContainer isAuth />
        </div>
        <WrapperPage>
          <div className="dashboard-page">
            <div className="skeleton balance-card-skeleton"></div>
            <div className="skeleton chart-card-skeleton"></div>
          </div>
        </WrapperPage>
      </div>
    );
  }

  if (!data) return null;

  const chartData = getChartData();

  return (
    <div className="dashboard-page-wrapper">
      <div className="hide-on-mobile">
        <Header disableContainer isAuth />
      </div>
      <WrapperPage>
        <div className="dashboard-page">
          {/* ===== UNIFIED BALANCE CARD ===== */}
          <div className="balance-card-unified">
            <div className="balance-main">
              <span className="balance-value">{formatCurrency(data.stats.balance)}</span>
            </div>
            
            {/* Вариант A: Stepper */}
            {BALANCE_STATUS_VARIANT === 'stepper' && (() => {
              const step = getActiveStep();
              const stepIndex = step === 'block' ? 0 : step === 'active' ? 1 : 2;
              const steps = [
                { key: 'block', label: 'Block' },
                { key: 'active', label: 'Active' },
                { key: 'withdrawal', label: 'Withdraw' },
              ];
              return (
                <div className="status-stepper">
                  {steps.map((s, i) => {
                    const isCompleted = i < stepIndex;
                    const isCurrent = i === stepIndex;
                    // Withdrawal current looks same as completed (checkmark, no glow)
                    const stateClass = isCompleted ? 'completed' : (isCurrent && step === 'withdrawal') ? 'completed' : isCurrent ? 'current' : '';
                    const colorClass = i === 0 ? 'step-block' : i === 1 ? 'step-active' : 'step-withdrawal';
                    return (
                      <React.Fragment key={s.key}>
                        <div className={`step ${stateClass} ${colorClass}`}>
                          <div className="step-dot">
                            {(isCompleted || (isCurrent && step === 'withdrawal')) ? (
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            ) : (
                              <span className="step-number">{i + 1}</span>
                            )}
                          </div>
                          <span className="step-label">{s.label}</span>
                        </div>
                        {i < 2 && (
                          <div className={`step-line ${i < stepIndex ? 'filled' : ''} ${i === 0 ? 'line-block-active' : 'line-active-withdrawal'}`}></div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              );
            })()}

            {/* Вариант B: Progress bar */}
            {BALANCE_STATUS_VARIANT === 'progress' && (
              <div className="status-progress">
                <div className="progress-labels">
                  <span className={getActiveStep() === 'block' ? 'active' : ''}>Block</span>
                  <span className={getActiveStep() === 'active' ? 'active' : ''}>Active</span>
                  <span className={getActiveStep() === 'withdrawal' ? 'active' : ''}>Withdraw</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-track"></div>
                  <div className={`progress-fill ${getActiveStep()}`}></div>
                  <div className={`progress-indicator ${getActiveStep()}`}></div>
                </div>
              </div>
            )}
          </div>

          <div className="chart-card">
            <div className="chart-header">
              <h3 className="chart-title">Capital growth chart</h3>
              <div className="chart-controls">
                <div className="date-picker">
                  <CalendarIcon className="calendar-icon" />
                  <span>{getDateRangeLabel()}</span>
                </div>
              </div>
            </div>
            <div className="chart-container">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A56DB" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#1A56DB" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
                  <XAxis dataKey="month" stroke={chartColors.axis} fontSize={11} tickLine={false} axisLine={false} padding={{ left: 20, right: 20 }} interval={0} dy={10} />
                  <YAxis stroke={chartColors.axis} fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => v >= 1000 ? `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}K` : `$${v}`} width={50} domain={[0, 'auto']} />
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div style={{
                            ...tooltipStyle,
                            padding: '8px 12px',
                          }}>
                            <span style={{ color: '#94A3B8', fontSize: '12px' }}>{payload[0]?.payload?.month}</span>
                            <div style={{ color: '#60A5FA', fontSize: '14px', fontWeight: 600, marginTop: '2px' }}>
                              {formatCurrency(payload[0]?.value as number)}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#1A56DB" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorValue)"
                    dot={{ fill: "#1A56DB", strokeWidth: 2, r: 4, stroke: chartColors.dotStroke }}
                    activeDot={{ r: 6, stroke: "#fff", strokeWidth: 2 }}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ===== STRATEGIES WIDGET ===== */}
          {STRATEGIES_WIDGET_VARIANT === 'compact' ? (
            // Вариант A: Компактный список
            <div className="strategies-widget compact">
              <div className="widget-header">
                <h3>Strategies</h3>
                <button className="view-all-btn" style={{display: 'none'}}>
                  View all →
                </button>
              </div>
              <div className="strategies-grid-compact">
                {strategies.map((strategy) => (
                  <div key={strategy.id} className="strategy-item-compact">
                    <span className="dot" style={{ backgroundColor: strategy.color }}></span>
                    <span className="name">{strategy.name}</span>
                    <span className="allocation">{strategy.allocation}%</span>
                    <span className={`profitability ${strategy.profitability >= 0 ? 'positive' : 'negative'}`}>
                      {formatProfitability(strategy.profitability)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Вариант B: С мини-диаграммой
            <div className="strategies-widget with-chart">
              <div className="widget-header">
                <h3>Strategies</h3>
                <button className="view-all-btn" style={{display: 'none'}}>
                  View all →
                </button>
              </div>
              <div className="widget-content">
                <div className="mini-pie-container">
                  <PieChart width={200} height={200}>
                    <Pie
                      data={pieData}
                      cx={100}
                      cy={100}
                      innerRadius={50}
                      outerRadius={85}
                      dataKey="value"
                      stroke="none"
                      startAngle={90}
                      endAngle={-270}
                    >
                      {pieData.map((entry, index) => (
                        <Cell 
                          key={index} 
                          fill={entry.color}
                          opacity={activeStrategyIndex === null || activeStrategyIndex === index ? 1 : 0.3}
                          style={{ 
                            cursor: 'pointer',
                            transition: 'opacity 0.2s ease',
                          }}
                          onMouseEnter={() => setActiveStrategyIndex(index)}
                          onMouseLeave={() => setActiveStrategyIndex(null)}
                        />
                      ))}
                    </Pie>
                  </PieChart>
                </div>
                <div className="strategies-list-mini">
                  {strategies.map((strategy, index) => (
                    <div 
                      key={strategy.id} 
                      className={`strategy-row-mini ${activeStrategyIndex === index ? 'active' : ''} ${activeStrategyIndex !== null && activeStrategyIndex !== index ? 'dimmed' : ''}`}
                      onMouseEnter={() => setActiveStrategyIndex(index)}
                      onMouseLeave={() => setActiveStrategyIndex(null)}
                    >
                      <div className="row-left">
                        <span className="dot" style={{ backgroundColor: strategy.color }}></span>
                        <span className="name">{strategy.name}</span>
                      </div>
                      <div className="row-right">
                        <span className="allocation">{strategy.allocation}%</span>
                        <span className={`profitability ${strategy.profitability >= 0 ? 'positive' : 'negative'}`}>
                          {formatProfitability(strategy.profitability)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </WrapperPage>
    </div>
  );
}
