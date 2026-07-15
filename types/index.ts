export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    city: string;
  };
  status: 'active' | 'inactive' | 'pending';
}

export type SortableKeys = 'name' | 'email' | 'username' | 'phone';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  key: SortableKeys;
  order: SortOrder;
}

export interface FilterConfig {
  searchQuery: string;
  companyFilter: string;
  cityFilter: string;
  statusFilter: string;
}

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
}

export type Theme = 'light' | 'dark';
