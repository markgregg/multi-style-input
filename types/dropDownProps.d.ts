export interface DropDownProps {
    options: string[];
    onOptionSelected: (option: string) => void;
    activeIndex: number;
    onActiveOptionChanged: (activeIndex: number) => void;
    onMouseEnteredDropDown: () => void;
    onMouseLeftDropDown: () => void;
}
