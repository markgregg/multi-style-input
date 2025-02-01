import { InputSize } from './multiStyleInputProps';

export interface DropDownProps {
    options: string[];
    size?: InputSize;
    onOptionSelected: (option: string) => void;
    activeIndex: number;
    onActiveOptionChanged: (activeIndex: number) => void;
    onMouseEnteredDropDown: () => void;
    onMouseLeftDropDown: () => void;
}
