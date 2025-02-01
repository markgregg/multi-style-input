import { StoreApi, UseBoundStore, create } from 'zustand';
import { MultiStyleInputProps } from '@/types';
import { ManagedState } from '@/types/State/managed';

export const createManagedStore = ({
  text,
  textBlocks,
}: MultiStyleInputProps): UseBoundStore<StoreApi<ManagedState>> =>
  create<ManagedState>(() => ({
    text,
    textBlocks,
  }));
