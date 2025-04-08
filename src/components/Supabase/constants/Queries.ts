import { ISupabaseQuery } from "components/Supabase/interfaces/ISupabaseQuery";

interface IQueries {
  baseQuery: ISupabaseQuery[];
}

export const Queries: IQueries = {
  baseQuery: [
    {
      type: "where",
      field: 'trash',
      operator: 'eq',
      value: false
    }
  ]
};
