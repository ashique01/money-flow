export interface SelectOption {
  label: string;
  value: string;
}

export interface Pagination {
  page: number;
  limit: number;
}

export interface BaseEntity {
  created_at: string;
  updated_at: string;
}