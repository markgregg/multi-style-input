import { StoreApi, UseBoundStore, create } from 'zustand';
import { DropDownOptionsState } from '@/types/State';

export const createDropDownOptionsStore = (): UseBoundStore<
  StoreApi<DropDownOptionsState>
> =>
  create<DropDownOptionsState>((set) => ({
    id: null,
    options: null,
    activeOption: null,
    activeOptionIdx: null,
    setOptions: (id: string, options: string[]) =>
      set(() => ({
        id,
        options,
        activeOption: options[0],
        activeOptionIdx: 0,
      })),
    clearOptions: () =>
      set(() => ({
        id: null,
        options: null,
        activeOption: null,
        activeOptionIdx: null,
      })),
    setActiveOption: (index: number) =>
      set((state) =>
        state.options
          ? {
              activeOption: state.options[index],
              activeOptionIdx: index,
            }
          : {},
      ),
    next: () =>
      set((state) => {
        if (state.options) {
          const activeOptionIdx =
            state.activeOptionIdx !== null &&
            state.activeOptionIdx < state.options.length - 1
              ? (state.activeOptionIdx += 1)
              : 0;
          return {
            activeOption: state.options[activeOptionIdx],
            activeOptionIdx,
          };
        }
        return {};
      }),
    prev: () =>
      set((state) => {
        if (state.options) {
          const activeOptionIdx =
            state.activeOptionIdx !== null && state.activeOptionIdx > 0
              ? (state.activeOptionIdx -= 1)
              : state.options.length - 1;
          return {
            activeOption: state.options[activeOptionIdx],
            activeOptionIdx,
          };
        }
        return {};
      }),
  }));
