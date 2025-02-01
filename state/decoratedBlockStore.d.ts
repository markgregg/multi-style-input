import { StoreApi, UseBoundStore } from 'zustand';
import { DecoratedBlockState } from '../../../../../../src/types/State';
import { BlockEventProps } from '../../../../../../src/types';

export declare const createDecoratedBlockStore: ({ onBlockClick, onBlockDblClick, onBlockMouseDown, onBlockMouseUp, onBlockMouseEnter, onBlockMouseLeave, onBlockMouseOver, }: BlockEventProps) => UseBoundStore<StoreApi<DecoratedBlockState>>;
