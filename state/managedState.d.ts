import { StoreApi, UseBoundStore } from 'zustand';
import { SmartInputProps } from '../../../../../../src/types';
import { ManagedState } from '../../../../../../src/types/State/managed';

export declare const createManagedStore: ({ text, textBlocks, }: SmartInputProps) => UseBoundStore<StoreApi<ManagedState>>;
