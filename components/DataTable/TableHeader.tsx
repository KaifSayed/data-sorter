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
      className="px-6 py-4 cursor-pointer hover:bg-gray-100 transition-colors select-none text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
    >
      <div className="flex items-center gap-1">
        {label}
        <span className={`text-gray-400 transition-transform ${isActive ? 'text-blue-600 font-bold' : 'opacity-40'}`}>
          {isActive && currentSort.order === 'desc' ? '▼' : '▲'}
        </span>
      </div>
    </th>
  );
};
