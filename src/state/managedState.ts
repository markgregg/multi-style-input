import { StoreApi, UseBoundStore, create } from 'zustand';
import { SmartInputProps } from '@/types';
import { ManagedState } from '@/types/State/managed';

export const createManagedStore = ({
  text,
  textBlocks,
}: SmartInputProps): UseBoundStore<StoreApi<ManagedState>> =>
  create<ManagedState>(() => ({
    text,
    textBlocks,
  }));
