export interface DropDownOptionsState {
  id: string | null;
  options: string[] | null;
  activeOption: string | null;
  activeOptionIdx: number | null;
  setActiveOption: (index: number) => void;
  setOptions: (id: string, options: string[]) => void;
  clearOptions: () => void;
  next: () => void;
  prev: () => void;
}
