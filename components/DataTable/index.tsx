'use client';

import React from 'react';
import { User } from '../../types';
import { useDataTable } from '../../hooks/useDataTable';
import { TableHeader } from './TableHeader';

interface DataTableProps {
  data: User[];
}

export const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const {
    processedData,
    sortConfig,
    filters,
    setFilters,
    handleSort,
    uniqueCompanies,
  } = useDataTable(data);

  return (
    <div className="w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
      
      {/* Dynamic Controls Bar */}
      <div className="p-5 border-b border-gray-200 bg-gray-50 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full sm:w-80 px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          value={filters.searchQuery}
          onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
        />

        <select
          className="w-full sm:w-56 px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          value={filters.companyFilter}
          onChange={(e) => setFilters({ ...filters, companyFilter: e.target.value })}
        >
          <option value="">All Companies</option>
          {uniqueCompanies.map((company) => (
            <option key={company} value={company}>{company}</option>
          ))}
        </select>
      </div>

      {/* Accessible Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <TableHeader label="Name" sortKey="name" currentSort={sortConfig} onSort={handleSort} />
              <TableHeader label="Username" sortKey="username" currentSort={sortConfig} onSort={handleSort} />
              <TableHeader label="Email" sortKey="email" currentSort={sortConfig} onSort={handleSort} />
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Company</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Website</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white text-sm text-gray-700">
            {processedData.length > 0 ? (
              processedData.map((user) => (
                <tr key={user.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>
                  <td className="px-6 py-4 text-gray-500 whitespace-nowrap">@{user.username}</td>
                  <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                      {user.company.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-blue-600 hover:underline whitespace-nowrap">
                    <a href={`https://${user.website}`} target="_blank" rel="noreferrer">{user.website}</a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-gray-400 font-medium">
                  No records match your filter criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
