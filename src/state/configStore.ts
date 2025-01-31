import { StoreApi, UseBoundStore, create } from 'zustand';
import { ConfigState } from '@/types/State';
import { SmartInputProps } from '@/types';

export const createConfigStore = ({
  tabIndex,
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
}: SmartInputProps): UseBoundStore<StoreApi<ConfigState>> =>
  create<ConfigState>(() => ({
    tabIndex,
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
