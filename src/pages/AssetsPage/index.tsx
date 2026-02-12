import React, { useState, useEffect, useMemo } from "react";
import "./styles.scss";
import WrapperPage from "../../components/WrapperPage";
import Header from "../../components/Header";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";
import { 
  fetchAssetsData, 
  fetchCryptoPrices, 
  calculateQuantity, 
  formatQuantity, 
  formatPrice,
  AssetsData, 
  AssetItem, 
  StrategyItem,
  CryptoPrices 
} from "../../api/assets";

// Импорт иконок криптовалют
import BtcIcon from "../../assets/icons/crypto/btc.svg";
import EthIcon from "../../assets/icons/crypto/eth.svg";
import AltcoinsIcon from "../../assets/icons/crypto/altcoins.svg";
import StablecoinsIcon from "../../assets/icons/crypto/stablecoins.svg";
import UsdIcon from "../../assets/icons/crypto/usd.svg";
import { useTheme } from "../../provider/ThemeProvider";

type ViewType = "assets" | "strategies";
type ChartType = "pie" | "bar";

// Маппинг названий к иконкам
const assetIconMap: Record<string, string> = {
  'BTC': BtcIcon,
  'Bitcoin': BtcIcon,
  'ETH': EthIcon,
  'Ethereum': EthIcon,
  'Altcoins': AltcoinsIcon,
  'Stablecoins': StablecoinsIcon,
  'USD': UsdIcon,
  'USDT': StablecoinsIcon,
  'USDC': StablecoinsIcon,
};

// Получить иконку по названию актива
const getAssetIcon = (name: string): string | null => {
  return assetIconMap[name] || null;
};

// Кастомный активный сектор для pie chart
const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

// Рассчитываем позиции пузырей вокруг pie chart
const getBubblePositions = (data: (AssetItem | StrategyItem)[], centerX: number, centerY: number, radius: number) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 90; // Начинаем сверху (90°), как в Pie с startAngle=90
  
  return data.map((item) => {
    const itemAngle = (item.value / total) * 360;
    const midAngle = currentAngle - itemAngle / 2; // Против часовой стрелки
    const angleRad = (midAngle * Math.PI) / 180;
    
    const x = centerX + Math.cos(angleRad) * radius;
    const y = centerY - Math.sin(angleRad) * radius; // Минус для инверсии Y (CSS координаты)
    
    currentAngle -= itemAngle; // Движемся против часовой стрелки
    
    return { ...item, x, y };
  });
};

export default function AssetsPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [viewType, setViewType] = useState<ViewType>("assets");
  const [chartType, setChartType] = useState<ChartType>("pie");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AssetsData | null>(null);
  const [prices, setPrices] = useState<CryptoPrices>({});

  useEffect(() => {
    loadData();
  }, []);

  // Автообновление курсов каждую минуту
  useEffect(() => {
    const updatePrices = async () => {
      try {
        const newPrices = await fetchCryptoPrices();
        setPrices(newPrices);
      } catch (error) {
        console.error('Error updating prices:', error);
      }
    };

    // Обновляем каждые 60 секунд
    const interval = setInterval(updatePrices, 60000);

    // Очистка при размонтировании
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // Загружаем данные и курсы параллельно
      const [assetsData, cryptoPrices] = await Promise.all([
        fetchAssetsData(),
        fetchCryptoPrices()
      ]);
      setData(assetsData);
      setPrices(cryptoPrices);
    } catch (error) {
      console.error('Error loading assets:', error);
    } finally {
      setLoading(false);
    }
  };

  // Обогащаем assets курсами и количествами
  const enrichedAssets = useMemo(() => {
    if (!data) return [];
    return data.assets.map(asset => {
      const symbol = asset.symbol || asset.name;
      const price = prices[symbol];
      const amount = asset.amount || 0;
      const quantity = price ? calculateQuantity(amount, price) : 0;
      
      return {
        ...asset,
        price,
        quantity,
        symbol,
      };
    });
  }, [data, prices]);

  const currentData = useMemo(() => {
    if (!data) return [];
    return viewType === "assets" ? enrichedAssets : data.strategies;
  }, [data, viewType, enrichedAssets]);

  const bubblePositions = useMemo(() => {
    return getBubblePositions(currentData, 200, 200, 165);
  }, [currentData]);

  const tooltipStyle = {
    background: isDark ? "#0A1330" : "#FFFFFF",
    border: `1px solid ${isDark ? "#1a1a3e" : "#E5E7EB"}`,
    borderRadius: 8,
    color: isDark ? "#fff" : "#111827",
    padding: "12px 16px",
  };

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  // Skeleton loader
  if (loading) {
    return (
      <div className="assets-page-wrapper">
        <div className="hide-on-mobile">
          <Header disableContainer isAuth />
        </div>
        <WrapperPage>
          <div className="assets-page">
            <div className="page-header">
              <h2>Assets</h2>
              <p className="subtitle">Your portfolio distribution</p>
            </div>
            <div className="assets-layout">
              <div className="left-column">
                <div className="skeleton distribution-skeleton"></div>
                <div className="skeleton distribution-skeleton"></div>
              </div>
              <div className="skeleton chart-skeleton"></div>
            </div>
          </div>
        </WrapperPage>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="assets-page-wrapper">
      <div className="hide-on-mobile">
        <Header disableContainer isAuth />
      </div>
      <WrapperPage>
        <div className="assets-page">
          <div className="page-header">
            <h2>Assets</h2>
            <p className="subtitle">Your portfolio distribution</p>
          </div>

          <div className="assets-layout">
            <div className="left-column">
              <div className="distribution-card">
                <h3>Distribution by assets</h3>
                {enrichedAssets.map((item, index) => {
                  const icon = getAssetIcon(item.name);
                  const hasCryptoPrice = item.price && !['Altcoins', 'Stablecoins', 'USD', 'ALT'].includes(item.symbol || '');
                  
                  return (
                    <div 
                      key={index} 
                      className={`distribution-row expanded ${viewType === 'assets' && activeIndex === index ? 'active' : ''}`}
                      onMouseEnter={() => viewType === 'assets' && setActiveIndex(index)}
                      onMouseLeave={() => setActiveIndex(null)}
                    >
                      <div className="row-header">
                        <div className="row-left">
                          {icon ? (
                            <img src={icon} alt={item.name} className="crypto-icon" />
                          ) : (
                            <span className="dot" style={{ backgroundColor: item.color }}></span>
                          )}
                          <span className="name">{item.name}</span>
                        </div>
                        <div className="row-right">
                          <span className="percentage">{item.value}%</span>
                        </div>
                      </div>
                      <div className="row-details">
                        {hasCryptoPrice && (
                          <>
                            <div className="detail-item">
                              <span className="detail-label">Price</span>
                              <span className="detail-value">${formatPrice(item.price!)}</span>
                            </div>
                            <div className="detail-item">
                              <span className="detail-label">Holdings</span>
                              <span className="detail-value">{formatQuantity(item.quantity!, item.symbol!)} {item.symbol}</span>
                            </div>
                          </>
                        )}
                        <div className="detail-item">
                          <span className="detail-label">Value</span>
                          <span className="detail-value highlight">${item.amount?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="distribution-card">
                <h3>Distribution by strategies</h3>
                {data.strategies.map((item, index) => (
                  <div 
                    key={index} 
                    className={`distribution-row ${viewType === 'strategies' && activeIndex === index ? 'active' : ''}`}
                    onMouseEnter={() => viewType === 'strategies' && setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <div className="row-left">
                      <span className="dot" style={{ backgroundColor: item.color }}></span>
                      <span className="name">{item.name}</span>
                    </div>
                    <span className="value">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="chart-card">
              <div className="pill-tabs">
                <button 
                  className={viewType === "assets" ? "pill-tab active" : "pill-tab"} 
                  onClick={() => { setViewType("assets"); setActiveIndex(null); }}
                >
                  Distribution by assets
                </button>
                <button 
                  className={viewType === "strategies" ? "pill-tab active" : "pill-tab"} 
                  onClick={() => { setViewType("strategies"); setActiveIndex(null); }}
                >
                  Distribution by strategies
                </button>
              </div>

              <div className="chart-header">
                <h3>Portfolio distribution</h3>
                <div className="chart-toggle">
                  <button 
                    className={chartType === "pie" ? "toggle-btn active" : "toggle-btn"} 
                    onClick={() => setChartType("pie")}
                  >
                    Pie
                  </button>
                  <button 
                    className={chartType === "bar" ? "toggle-btn active" : "toggle-btn"} 
                    onClick={() => setChartType("bar")}
                  >
                    Bar
                  </button>
                </div>
              </div>

              <div className="chart-area">
                {chartType === "pie" ? (
                  <div className="pie-wrapper">
                    <PieChart width={400} height={400}>
                      <Pie
                        data={currentData}
                        cx={200}
                        cy={200}
                        innerRadius={75}
                        outerRadius={120}
                        dataKey="value"
                        paddingAngle={0}
                        stroke="none"
                        startAngle={90}
                        endAngle={-270}
                        activeIndex={activeIndex !== null ? activeIndex : undefined}
                        activeShape={renderActiveShape}
                        onMouseEnter={onPieEnter}
                        onMouseLeave={onPieLeave}
                        animationBegin={0}
                        animationDuration={800}
                      >
                        {currentData.map((entry, index) => (
                          <Cell 
                            key={index} 
                            fill={entry.color}
                            style={{ 
                              filter: activeIndex !== null && activeIndex !== index 
                                ? 'opacity(0.5)' 
                                : 'none',
                              transition: 'filter 0.2s'
                            }}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={tooltipStyle} 
                        formatter={(value: number, name: string, props: any) => [
                          `${value}%`,
                          props.payload.name
                        ]} 
                      />
                    </PieChart>
                    
                    {/* Белые пузыри с процентами */}
                    {bubblePositions.map((item, index) => (
                      <div
                        key={index}
                        className={`pie-bubble ${activeIndex === index ? 'active' : ''}`}
                        style={{
                          left: item.x,
                          top: item.y,
                        }}
                        onMouseEnter={() => setActiveIndex(index)}
                        onMouseLeave={() => setActiveIndex(null)}
                      >
                        {item.value}%
                      </div>
                    ))}
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart 
                      data={currentData} 
                      layout="vertical" 
                      margin={{ left: 10, right: 30 }}
                    >
                      <XAxis 
                        type="number" 
                        stroke={isDark ? "#8C89B4" : "#6B7280"} 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        domain={[0, 'dataMax + 10']} 
                        tickFormatter={(v) => `${v}%`}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        stroke={isDark ? "#8C89B4" : "#6B7280"} 
                        fontSize={12} 
                        tickLine={false} 
                        axisLine={false} 
                        width={90} 
                      />
                      <Tooltip 
                        contentStyle={tooltipStyle} 
                        formatter={(value: number) => [`${value}%`, "Share"]}
                        cursor={{ fill: 'rgba(26, 86, 219, 0.1)' }}
                      />
                      <Bar 
                        dataKey="value" 
                        radius={[0, 6, 6, 0]}
                        animationDuration={800}
                      >
                        {currentData.map((entry, index) => (
                          <Cell 
                            key={index} 
                            fill={entry.color}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>

              <div className="chart-legend">
                {currentData.map((item, index) => (
                  <div 
                    key={index} 
                    className={`legend-item ${activeIndex === index ? 'active' : ''}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onMouseLeave={() => setActiveIndex(null)}
                  >
                    <span className="legend-dot" style={{ backgroundColor: item.color }}></span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </WrapperPage>
    </div>
  );
}
