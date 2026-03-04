import React from 'react';
import './styles.scss';

interface EmptyStateProps {
  icon?: 'trades' | 'transactions' | 'satellites' | 'data' | 'search' | 'notifications';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const icons = {
  trades: (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3"/>
      <path d="M20 38L28 30L34 36L44 26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M38 26H44V32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  transactions: (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3"/>
      <rect x="20" y="24" width="24" height="16" rx="2" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M20 30H44" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="36" cy="36" r="2" fill="currentColor"/>
    </svg>
  ),
  satellites: (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3"/>
      <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2.5"/>
      <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
      <circle cx="32" cy="16" r="3" fill="currentColor"/>
      <circle cx="44" cy="38" r="3" fill="currentColor"/>
      <circle cx="20" cy="38" r="3" fill="currentColor"/>
    </svg>
  ),
  data: (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3"/>
      <path d="M24 20H40C41.1 20 42 20.9 42 22V42C42 43.1 41.1 44 40 44H24C22.9 44 22 43.1 22 42V22C22 20.9 22.9 20 24 20Z" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M27 28H37" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M27 33H37" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M27 38H33" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  search: (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3"/>
      <circle cx="30" cy="30" r="10" stroke="currentColor" strokeWidth="2.5"/>
      <path d="M38 38L44 44" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  ),
  notifications: (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" opacity="0.3"/>
      <path d="M32 20C26.5 20 22 24.5 22 30V36L20 40H44L42 36V30C42 24.5 37.5 20 32 20Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
      <path d="M28 40V42C28 44.2 29.8 46 32 46C34.2 46 36 44.2 36 42V40" stroke="currentColor" strokeWidth="2.5"/>
    </svg>
  ),
};

export default function EmptyState({ icon = 'data', title, description, action }: EmptyStateProps) {
  return (
    <div className="empty-state fade-in">
      <div className="empty-state__icon">
        {icons[icon]}
      </div>
      <h3 className="empty-state__title">{title}</h3>
      {description && (
        <p className="empty-state__description">{description}</p>
      )}
      {action && (
        <button className="empty-state__action" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
}
