import { StoreApi, UseBoundStore } from 'zustand';
import { MultiStyleInputProps } from '../../../../../../src/types';
import { ManagedState } from '../../../../../../src/types/State/managed';

export declare const createManagedStore: ({ text, textBlocks, }: MultiStyleInputProps) => UseBoundStore<StoreApi<ManagedState>>;
