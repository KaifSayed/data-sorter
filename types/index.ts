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
}

export type SortableKeys = 'name' | 'email' | 'username';
export type SortOrder = 'asc' | 'desc';

export interface SortConfig {
  key: SortableKeys;
  order: SortOrder;
}

export interface FilterConfig {
  searchQuery: string;
  companyFilter: string;
}
