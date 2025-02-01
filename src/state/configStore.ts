import { StoreApi, UseBoundStore, create } from 'zustand';
import { ConfigState } from '@/types/State';
import { MultiStyledInputProps } from '@/types';

export const createConfigStore = ({
  tabIndex,
  className,
  style,
  DropDownComponent,
  onItemSelected,
  onChange,
  onCaretPositionChange,
  onFocus,
  onBlur,
  onClick,
  onDoubleClick,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
  onMouseLeave,
  onMouseOver,
  onKeyDown,
  onKeyUp,
}: MultiStyledInputProps): UseBoundStore<StoreApi<ConfigState>> =>
  create<ConfigState>(() => ({
    tabIndex,
    className,
    style,
    DropDownComponent,
    onItemSelected,
    onChange,
    onCaretPositionChange,
    onFocus,
    onBlur,
    onClick,
    onDoubleClick,
    onMouseDown,
    onMouseUp,
    onMouseEnter,
    onMouseLeave,
    onMouseOver,
    onKeyDown,
    onKeyUp,
  }));
