import { InputSize } from './multiStyleInputProps';

export interface DropDownProps {
  options: string[];
  size?: InputSize;
  onOptionSelected: (option: string) => void;
  activeIndex: number | null;
  onActiveOptionChanged: (activeIndex: number) => void;
}
