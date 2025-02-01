import { StoreApi, UseBoundStore } from 'zustand';
import { MultiStyledInputProps } from '../../../../../../src/types';
import { ManagedState } from '../../../../../../src/types/State/managed';

export declare const createManagedStore: ({ text, textBlocks, }: MultiStyledInputProps) => UseBoundStore<StoreApi<ManagedState>>;
