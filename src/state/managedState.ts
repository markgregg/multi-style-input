import { StoreApi, UseBoundStore, create } from 'zustand';
import { MultiStyledInputProps } from '@/types';
import { ManagedState } from '@/types/State/managed';

export const createManagedStore = ({
  text,
  textBlocks,
}: MultiStyledInputProps): UseBoundStore<StoreApi<ManagedState>> =>
  create<ManagedState>(() => ({
    text,
    textBlocks,
  }));
