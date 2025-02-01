export interface DropDownOptionsState {
    options: string[];
    activeOption: string;
    activeOptionIdx: number;
    setActiveOption: (index: number) => void;
    setOptions: (options: string[]) => void;
    next: () => void;
    prev: () => void;
}
