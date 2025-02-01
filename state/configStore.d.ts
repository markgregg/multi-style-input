import { StoreApi, UseBoundStore } from 'zustand';
import { ConfigState } from '../../../../../../src/types/State';
import { MultiStyleInputProps } from '../../../../../../src/types';

export declare const createConfigStore: ({ tabIndex, className, style, size, DropDownComponent, onItemSelected, onChange, onCaretPositionChange, onFocus, onBlur, onClick, onDoubleClick, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave, onMouseOver, onKeyDown, onKeyUp, }: MultiStyleInputProps) => UseBoundStore<StoreApi<ConfigState>>;
