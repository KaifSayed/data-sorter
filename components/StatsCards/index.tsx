'use client';

import React from 'react';

interface StatsCardsProps {
  total: number;
  active: number;
  cities: number;
  companies: number;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ total, active, cities, companies }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-icon indigo">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </div>
        <div className="stat-value">{total}</div>
        <div className="stat-label">Total Users</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon green">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <div className="stat-value">{active}</div>
        <div className="stat-label">Active Users</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon amber">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </div>
        <div className="stat-value">{cities}</div>
        <div className="stat-label">Cities</div>
      </div>

      <div className="stat-card">
        <div className="stat-icon blue">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
          </svg>
        </div>
        <div className="stat-value">{companies}</div>
        <div className="stat-label">Companies</div>
      </div>
    </div>
  );
};
