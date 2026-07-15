import React from 'react';
import { SortableKeys, SortConfig } from '../../types';

interface TableHeaderProps {
  label: string;
  sortKey: SortableKeys;
  currentSort: SortConfig;
  onSort: (key: SortableKeys) => void;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ label, sortKey, currentSort, onSort }) => {
  const isActive = currentSort.key === sortKey;

  return (
    <th
      onClick={() => onSort(sortKey)}
      className={`th-sortable ${isActive ? 'is-active' : ''}`}
      aria-sort={isActive ? (currentSort.order === 'asc' ? 'ascending' : 'descending') : undefined}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {label}
        <span className="sort-icon">
          <span className={`arrow ${isActive && currentSort.order === 'asc' ? 'active' : ''}`}>▲</span>
          <span className={`arrow ${isActive && currentSort.order === 'desc' ? 'active' : ''}`}>▼</span>
        </span>
      </div>
    </th>
  );
};
