import { StoreApi, UseBoundStore, create } from 'zustand';
import { DropDownOptionsState } from '@/types/State';

export const createDropDownOptionsStore = (): UseBoundStore<StoreApi<DropDownOptionsState>> =>
  create<DropDownOptionsState>((set) => ({
    options: [],
    activeOption: '',
    activeOptionIdx: 0,
    setOptions: (options: string[]) => set(() => ({ options, activeOption: options[0], activeOptionIdx: 0 })),
    setActiveOption: (index: number) => set((state) => ({ activeOption: state.options[index], activeOptionIdx: index })),
    next: () => set((state) => {
      const activeOptionIdx = state.activeOptionIdx < state.options.length - 1
        ? state.activeOptionIdx += 1
        : 0;
      return ({ activeOption: state.options[activeOptionIdx], activeOptionIdx });
    }),
    prev: () => set((state) => {
      const activeOptionIdx = state.activeOptionIdx > 0
        ? state.activeOptionIdx -= 1
        : state.options.length - 1;
      return ({ activeOption: state.options[activeOptionIdx], activeOptionIdx });
    }),
  }),
  );
