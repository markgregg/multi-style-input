import { BlockEventProps } from './blockEventProps';
import { DecoratedBlock } from './decoratedBlock';
import { DropDownProps } from './dropDownProps';

export type InputSize = 'compact' | 'normal' | 'large';

export interface MultiStyleInputProps extends BlockEventProps {
  text: string;
  textBlocks: DecoratedBlock[];
  tabIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  size?: InputSize;
  uneditable?: true;
  DropDownComponent?: React.ComponentType<DropDownProps>;
  onItemSelected?: (id: string, option: string) => void;
  onChange?: (text: string, position: number) => void;
  onCaretPositionChange?: (position: number) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
  onDoubleClick?: (event: React.MouseEvent) => void;
  onMouseDown?: (event: React.MouseEvent) => void;
  onMouseUp?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onMouseOver?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onKeyUp?: (event: React.KeyboardEvent) => void;
}
