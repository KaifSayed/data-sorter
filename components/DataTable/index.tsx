'use client';

import React from 'react';
import { User } from '../../types';
import { useDataTable } from '../../hooks/useDataTable';
import { TableHeader } from './TableHeader';
import { StatusBadge } from './StatusBadge';
import { Pagination } from './Pagination';
import { StatsCards } from '../StatsCards';

interface DataTableProps {
  data: User[];
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const {
    paginatedData,
    totalFiltered,
    stats,
    sortConfig,
    handleSort,
    filters,
    setSearchQuery,
    updateFilters,
    clearFilters,
    hasActiveFilters,
    uniqueCompanies,
    uniqueCities,
    currentPage,
    totalPages,
    pageSize,
    goToPage,
    setPageSize,
  } = useDataTable(data);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Stats Overview */}
      <StatsCards
        total={stats.total}
        active={stats.active}
        cities={stats.cities}
        companies={stats.companies}
      />

      {/* Table */}
      <div className="table-container">
        {/* Filter Toolbar */}
        <div className="filter-toolbar">
          <input
            id="search-input"
            type="text"
            placeholder="Search name, email, username, or phone…"
            className="filter-input"
            value={filters.searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            id="company-filter"
            className="filter-select"
            value={filters.companyFilter}
            onChange={(e) => updateFilters({ ...filters, companyFilter: e.target.value })}
          >
            <option value="">All Companies</option>
            {uniqueCompanies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            id="city-filter"
            className="filter-select"
            value={filters.cityFilter}
            onChange={(e) => updateFilters({ ...filters, cityFilter: e.target.value })}
          >
            <option value="">All Cities</option>
            {uniqueCities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            id="status-filter"
            className="filter-select"
            value={filters.statusFilter}
            onChange={(e) => updateFilters({ ...filters, statusFilter: e.target.value })}
          >
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="inactive">Inactive</option>
          </select>

          {hasActiveFilters && (
            <button
              id="clear-filters"
              className="filter-clear"
              onClick={clearFilters}
            >
              ✕ Clear
            </button>
          )}

          <div className="filter-spacer" />

          <span className="results-count">
            {totalFiltered} result{totalFiltered !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Table */}
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <TableHeader label="Name" sortKey="name" currentSort={sortConfig} onSort={handleSort} />
                <TableHeader label="Username" sortKey="username" currentSort={sortConfig} onSort={handleSort} />
                <TableHeader label="Email" sortKey="email" currentSort={sortConfig} onSort={handleSort} />
                <TableHeader label="Phone" sortKey="phone" currentSort={sortConfig} onSort={handleSort} />
                <th>City</th>
                <th>Company</th>
                <th>Status</th>
                <th>Website</th>
              </tr>
            </thead>
            <tbody key={`${currentPage}-${pageSize}-${filters.companyFilter}-${filters.cityFilter}-${filters.statusFilter}`}>
              {paginatedData.length > 0 ? (
                paginatedData.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="cell-name">
                        <span className="avatar">{getInitials(user.name)}</span>
                        {user.name}
                      </div>
                    </td>
                    <td className="cell-username">@{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address.city}</td>
                    <td>
                      <span className="cell-company">{user.company.name}</span>
                    </td>
                    <td>
                      <StatusBadge status={user.status} />
                    </td>
                    <td>
                      <a
                        href={`https://${user.website}`}
                        target="_blank"
                        rel="noreferrer"
                        className="cell-link"
                      >
                        {user.website}
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8}>
                    <div className="empty-state">
                      <div className="empty-state-icon">🔍</div>
                      <div className="empty-state-title">No results found</div>
                      <div className="empty-state-desc">Try adjusting your search or filter criteria</div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          pageSize={pageSize}
          totalFiltered={totalFiltered}
          onPageChange={goToPage}
          onPageSizeChange={setPageSize}
        />
      </div>
    </div>
  );
};
