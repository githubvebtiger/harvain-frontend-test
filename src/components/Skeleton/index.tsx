import React from 'react';
import './styles.scss';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

// Base Skeleton element
export function Skeleton({ width = '100%', height = 20, borderRadius = 8, className = '' }: SkeletonProps) {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{ 
        width: typeof width === 'number' ? `${width}px` : width,
        height: typeof height === 'number' ? `${height}px` : height,
        borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius
      }}
    />
  );
}

// Skeleton for table rows
export function SkeletonTableRow({ columns = 5 }: { columns?: number }) {
  return (
    <div className="skeleton-table-row">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} width={`${Math.random() * 30 + 50}%`} height={16} />
      ))}
    </div>
  );
}

// Skeleton for table
export function SkeletonTable({ rows = 5, columns = 5 }: { rows?: number; columns?: number }) {
  return (
    <div className="skeleton-table fade-in">
      <div className="skeleton-table-header">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} width={80} height={14} />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonTableRow key={i} columns={columns} />
      ))}
    </div>
  );
}

// Skeleton for card
export function SkeletonCard() {
  return (
    <div className="skeleton-card fade-in">
      <div className="skeleton-card__header">
        <Skeleton width={40} height={40} borderRadius="50%" />
        <div className="skeleton-card__header-text">
          <Skeleton width={120} height={16} />
          <Skeleton width={80} height={12} />
        </div>
      </div>
      <div className="skeleton-card__content">
        <Skeleton width="100%" height={14} />
        <Skeleton width="80%" height={14} />
        <Skeleton width="60%" height={14} />
      </div>
    </div>
  );
}

// Skeleton for profile form
export function SkeletonProfileForm() {
  return (
    <div className="skeleton-profile-form fade-in">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton-field">
          <Skeleton width={100} height={14} />
          <Skeleton width="100%" height={48} borderRadius={12} />
        </div>
      ))}
      <div className="skeleton-banners">
        <Skeleton width="100%" height={80} borderRadius={12} />
        <Skeleton width="100%" height={80} borderRadius={12} />
      </div>
    </div>
  );
}

// Skeleton for trade history item
export function SkeletonTradeItem() {
  return (
    <div className="skeleton-trade-item fade-in">
      <div className="skeleton-trade-item__grid">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="skeleton-trade-item__field">
            <Skeleton width={80} height={12} />
            <Skeleton width={`${Math.random() * 40 + 40}%`} height={16} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton for Dashboard stats
export function SkeletonDashboardStats() {
  return (
    <div className="skeleton-dashboard-stats fade-in">
      <div className="skeleton-balance-card">
        <Skeleton width={100} height={14} />
        <Skeleton width={180} height={36} />
        <div className="skeleton-balance-row">
          <Skeleton width={80} height={12} />
          <Skeleton width={60} height={12} />
        </div>
      </div>
      <div className="skeleton-profit-cards">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton-profit-card">
            <Skeleton width={60} height={12} />
            <Skeleton width={100} height={28} />
          </div>
        ))}
      </div>
    </div>
  );
}

// Skeleton for chart
export function SkeletonChart({ height = 300 }: { height?: number }) {
  return (
    <div className="skeleton-chart fade-in" style={{ height }}>
      <div className="skeleton-chart__header">
        <Skeleton width={150} height={20} />
        <Skeleton width={200} height={32} borderRadius={8} />
      </div>
      <div className="skeleton-chart__area">
        <svg viewBox="0 0 400 150" preserveAspectRatio="none">
          <path
            d="M0,100 Q50,80 100,90 T200,70 T300,85 T400,60"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            opacity="0.2"
          />
        </svg>
      </div>
    </div>
  );
}

// Skeleton for Assets pie chart
export function SkeletonPieChart() {
  return (
    <div className="skeleton-pie-chart fade-in">
      <Skeleton width={200} height={200} borderRadius="50%" />
      <div className="skeleton-pie-legend">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-pie-legend__item">
            <Skeleton width={12} height={12} borderRadius="50%" />
            <Skeleton width={80} height={14} />
            <Skeleton width={40} height={14} />
          </div>
        ))}
      </div>
    </div>
  );
}
