import { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import { User, SortConfig, FilterConfig, SortableKeys, PaginationConfig } from '../types';

export const useDataTable = (initialData: User[]) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'name', order: 'asc' });
  const [filters, setFilters] = useState<FilterConfig>({
    searchQuery: '',
    companyFilter: '',
    cityFilter: '',
    statusFilter: '',
  });
  const [pagination, setPagination] = useState<PaginationConfig>({
    currentPage: 1,
    pageSize: 25,
  });

  // Debounced search
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setSearchQuery = useCallback((query: string) => {
    setFilters((prev) => ({ ...prev, searchQuery: query }));

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(query);
    }, 200);
  }, []);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, []);

  // Handle toggle sorting
  const handleSort = useCallback((key: SortableKeys) => {
    setSortConfig((prev) => ({
      key,
      order: prev.key === key && prev.order === 'asc' ? 'desc' : 'asc',
    }));
    // Reset to page 1 on sort change
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, []);

  // Set filter and reset to page 1
  const updateFilters = useCallback((newFilters: FilterConfig) => {
    setFilters(newFilters);
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ searchQuery: '', companyFilter: '', cityFilter: '', statusFilter: '' });
    setDebouncedSearch('');
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  }, []);

  const hasActiveFilters = filters.searchQuery || filters.companyFilter || filters.cityFilter || filters.statusFilter;

  // Memoized processing pipeline: Filter -> Sort
  const filteredSortedData = useMemo(() => {
    let data = [...initialData];

    // 1. Filter: search (uses debounced value for performance)
    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();
      data = data.filter(
        (user) =>
          user.name.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query) ||
          user.phone.includes(query)
      );
    }

    // 2. Filter: company
    if (filters.companyFilter) {
      data = data.filter((user) => user.company.name === filters.companyFilter);
    }

    // 3. Filter: city
    if (filters.cityFilter) {
      data = data.filter((user) => user.address.city === filters.cityFilter);
    }

    // 4. Filter: status
    if (filters.statusFilter) {
      data = data.filter((user) => user.status === filters.statusFilter);
    }

    // 5. Sort
    data.sort((a, b) => {
      const aValue = a[sortConfig.key].toLowerCase();
      const bValue = b[sortConfig.key].toLowerCase();

      if (aValue < bValue) return sortConfig.order === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.order === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [initialData, sortConfig, debouncedSearch, filters.companyFilter, filters.cityFilter, filters.statusFilter]);

  // Pagination derived values
  const totalFiltered = filteredSortedData.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / pagination.pageSize));

  // Clamp current page
  const currentPage = Math.min(pagination.currentPage, totalPages);

  // Paginated slice
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pagination.pageSize;
    return filteredSortedData.slice(start, start + pagination.pageSize);
  }, [filteredSortedData, currentPage, pagination.pageSize]);

  const goToPage = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, currentPage: Math.max(1, Math.min(page, totalPages)) }));
  }, [totalPages]);

  const setPageSize = useCallback((size: number) => {
    setPagination({ pageSize: size, currentPage: 1 });
  }, []);

  // Extract unique values for filter dropdowns
  const uniqueCompanies = useMemo(() => {
    return Array.from(new Set(initialData.map((u) => u.company.name))).sort();
  }, [initialData]);

  const uniqueCities = useMemo(() => {
    return Array.from(new Set(initialData.map((u) => u.address.city))).sort();
  }, [initialData]);

  // Stat counts
  const stats = useMemo(() => {
    const active = initialData.filter((u) => u.status === 'active').length;
    const cities = new Set(initialData.map((u) => u.address.city)).size;
    const companies = new Set(initialData.map((u) => u.company.name)).size;
    return { total: initialData.length, active, cities, companies };
  }, [initialData]);

  return {
    // Data
    paginatedData,
    totalFiltered,
    stats,
    // Sort
    sortConfig,
    handleSort,
    // Filters
    filters,
    setSearchQuery,
    updateFilters,
    clearFilters,
    hasActiveFilters,
    uniqueCompanies,
    uniqueCities,
    // Pagination
    currentPage,
    totalPages,
    pageSize: pagination.pageSize,
    goToPage,
    setPageSize,
  };
};
