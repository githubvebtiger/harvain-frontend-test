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
import { useTheme } from "../../provider/ThemeProvider";

type ChartType = "pie" | "bar";

interface Strategy {
  id: string;
  name: string;
  allocation: number;  // % от капитала
  profitability: number;  // доходность %
  color: string;
}

// Mock данные (потом заменятся на API)
const mockStrategies: Strategy[] = [
  {
    id: '1',
    name: 'Арбитраж',
    allocation: 45,
    profitability: 24.5,
    color: '#3B82F6',
  },
  {
    id: '2',
    name: 'Spot Trading',
    allocation: 25,
    profitability: 18.2,
    color: '#22C55E',
  },
  {
    id: '3',
    name: 'Futures',
    allocation: 20,
    profitability: 31.8,
    color: '#F59E0B',
  },
  {
    id: '4',
    name: 'DeFi Yield',
    allocation: 10,
    profitability: 12.4,
    color: '#8B5CF6',
  },
];

// Форматирование процента с +/-
const formatProfitability = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${value.toFixed(1)}%`;
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

// Позиции пузырей вокруг pie chart
const getBubblePositions = (data: Strategy[], centerX: number, centerY: number, radius: number) => {
  const total = data.reduce((sum, item) => sum + item.allocation, 0);
  let currentAngle = 90;
  
  return data.map((item) => {
    const itemAngle = (item.allocation / total) * 360;
    const midAngle = currentAngle - itemAngle / 2;
    const angleRad = (midAngle * Math.PI) / 180;
    
    const x = centerX + Math.cos(angleRad) * radius;
    const y = centerY - Math.sin(angleRad) * radius;
    
    currentAngle -= itemAngle;
    
    return { ...item, x, y };
  });
};

export default function StrategiesPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [chartType, setChartType] = useState<ChartType>("pie");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [strategies, setStrategies] = useState<Strategy[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      // TODO: Заменить на реальный API
      await new Promise(resolve => setTimeout(resolve, 500));
      setStrategies(mockStrategies);
    } catch (error) {
      console.error('Error loading strategies:', error);
    } finally {
      setLoading(false);
    }
  };

  // Данные для графика
  const chartData = useMemo(() => {
    return strategies.map(s => ({
      name: s.name,
      value: s.allocation,
      color: s.color,
    }));
  }, [strategies]);

  const bubblePositions = useMemo(() => {
    return getBubblePositions(strategies, 200, 200, 165);
  }, [strategies]);

  // Общая доходность (взвешенная)
  const totalProfitability = useMemo(() => {
    return strategies.reduce((sum, s) => sum + s.profitability * s.allocation / 100, 0);
  }, [strategies]);

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
      <div className="strategies-page-wrapper">
        <div className="hide-on-mobile">
          <Header disableContainer isAuth />
        </div>
        <WrapperPage>
          <div className="strategies-page">
            <div className="page-header">
              <h2>Strategies</h2>
              <p className="subtitle">Your active trading strategies</p>
            </div>
            <div className="strategies-layout">
              <div className="skeleton list-skeleton"></div>
              <div className="skeleton chart-skeleton"></div>
            </div>
          </div>
        </WrapperPage>
      </div>
    );
  }

  return (
    <div className="strategies-page-wrapper">
      <div className="hide-on-mobile">
        <Header disableContainer isAuth />
      </div>
      <WrapperPage>
        <div className="strategies-page">
          <div className="page-header">
            <h2>Strategies</h2>
            <p className="subtitle">Your active trading strategies</p>
          </div>

          <div className="strategies-layout">
            {/* Левая колонка - список стратегий */}
            <div className="strategies-list-card">
              <div className="card-header">
                <h3>Distribution by strategies</h3>
                <div className="total-profitability">
                  <span className="label">Total:</span>
                  <span className={`value ${totalProfitability >= 0 ? 'positive' : 'negative'}`}>
                    {formatProfitability(totalProfitability)}
                  </span>
                </div>
              </div>

              {strategies.map((strategy, index) => (
                <div 
                  key={strategy.id} 
                  className={`strategy-row ${activeIndex === index ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
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

            {/* Правая колонка - график */}
            <div className="chart-card">
              <div className="chart-header">
                <h3>Capital allocation</h3>
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
                        data={chartData}
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
                        {chartData.map((entry, index) => (
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
                        {item.allocation}%
                      </div>
                    ))}
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart 
                      data={chartData} 
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
                        formatter={(value: number) => [`${value}%`, "Allocation"]}
                        cursor={{ fill: 'rgba(26, 86, 219, 0.1)' }}
                      />
                      <Bar 
                        dataKey="value" 
                        radius={[0, 6, 6, 0]}
                        animationDuration={800}
                      >
                        {chartData.map((entry, index) => (
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

              {/* Легенда */}
              <div className="chart-legend">
                {strategies.map((item, index) => (
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
