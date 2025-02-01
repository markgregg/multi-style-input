import { BlockEventProps } from '../blockEventProps';
import { DropDownProps } from '../dropDownProps';
import { InputSize } from '../multiStyleInputProps';

export interface ConfigState extends BlockEventProps {
    tabIndex?: number;
    className?: string;
    style?: React.CSSProperties;
    size?: InputSize;
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
