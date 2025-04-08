export interface ISupabaseQuery {
  type: 'where' | 'orderBy' | 'limit' | 'startAfter';
  field?: string;
  operator?: 'neq' | 'eq' | 'lt' | 'lte' | 'gt' | 'gte' | 'in' | 'like';
  value?: any | any[];
  direction?: 'asc' | 'desc';
  limit?: number;
}
