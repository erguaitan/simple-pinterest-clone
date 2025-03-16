import { create } from "zustand";

const useBookStore = create((set) => ({
  value: 'cat',
  updateValue: (newValue) => set({ value: newValue })
}));

export default useBookStore