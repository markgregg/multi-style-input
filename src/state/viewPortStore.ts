import { StoreApi, UseBoundStore, create } from 'zustand';
import { ViewPortState } from '@/types/State';

export const createViewPortStore = (): UseBoundStore<StoreApi<ViewPortState>> =>
  create<ViewPortState>((set) => ({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    setPosition: (top: number, left: number) => set(() => ({ top, left })),
    setSize: (width: number, height: number) => set(() => ({ width, height })),
  }));
