import { useState, useMemo } from 'react';
import { User, SortConfig, FilterConfig, SortableKeys } from '../types';

export const useDataTable = (initialData: User[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', order: 'asc' });
  const [filters, setFilters] = useState<FilterConfig>({ searchQuery: '', companyFilter: '' });

  // Handle toggle sorting
  const handleSort = (key: SortableKeys) => {
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc',
    }));
  };

  // Memoized processing pipeline: Filter -> Sort
  const processedData = useMemo(() => {
    let data = [...initialData];

    // 1. Filter Logic
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      data = data.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    if (filters.companyFilter) {
      data = data.filter((user) => user.company.name === filters.companyFilter);
    }

    // 2. Sort Logic
    data.sort((a, b) => {
      const aValue = a[sortConfig.key].toLowerCase();
      const bValue = b[sortConfig.key].toLowerCase();

      if (aValue < bValue) return sortConfig.order === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.order === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [initialData, sortConfig, filters]);

  // Extract unique companies dynamically for the filter dropdown
  const uniqueCompanies = useMemo(() => {
    return Array.from(new Set(initialData.map((user) => user.company.name)));
  }, [initialData]);

  return {
    processedData,
    sortConfig,
    filters,
    setFilters,
    handleSort,
    uniqueCompanies,
  };
};
