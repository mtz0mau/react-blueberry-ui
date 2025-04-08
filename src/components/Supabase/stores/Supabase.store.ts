import { create } from "zustand";

interface SupabaseStore {
  url: string;
  setUrl: (url: string) => void;

  key: string;
  setKey: (key: string) => void;

  supabase: any;
  setSupabase: (supabase: any) => void;

  reset: () => void;
}

export const useSupabaseStore = create<SupabaseStore>((set) => ({
  url: '',
  setUrl: (url) => set({ url }),

  key: '',
  setKey: (key) => set({ key }),

  supabase: null,
  setSupabase: (supabase) => set({ supabase }),

  reset: () => set({ url: '', key: '', supabase: null })
}));
