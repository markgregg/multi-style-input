import { StoreApi, UseBoundStore } from 'zustand';
import { ViewPortState } from '../../../../../../src/types/State';

export declare const createViewPortStore: () => UseBoundStore<StoreApi<ViewPortState>>;
