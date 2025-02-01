import { StoreApi, UseBoundStore } from 'zustand';
import { ConfigState } from '../../../../../../src/types/State';
import { SmartInputProps } from '../../../../../../src/types';

export declare const createConfigStore: ({ tabIndex, DropDownComponent, onItemSelected, onChange, onCaretPositionChange, onFocus, onBlur, onClick, onDoubleClick, onMouseDown, onMouseUp, onMouseEnter, onMouseLeave, onMouseOver, onKeyDown, onKeyUp, }: SmartInputProps) => UseBoundStore<StoreApi<ConfigState>>;
