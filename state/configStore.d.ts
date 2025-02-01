import { StoreApi, UseBoundStore } from 'zustand';
import { ConfigState } from '../../../../../../src/types/State';
import { MultiStyledInputProps } from '../../../../../../src/types';

export declare const createConfigStore: ({ tabIndex, className, style, DropDownComponent, onItemSelected, onChange, onCaretPositionChange, onFocus, onBlur, onClick, onDoubleClick, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave, onMouseOver, onKeyDown, onKeyUp, }: MultiStyledInputProps) => UseBoundStore<StoreApi<ConfigState>>;
