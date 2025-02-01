import { InputSize } from './multiStyleInputProps';

export interface ComponentProps {
    id: string;
    clasName?: string;
    style?: React.CSSProperties;
    text: string;
    start: number;
    end: number;
    cursorPosition: number;
    size?: InputSize;
    textElement: HTMLElement;
    customProps?: any;
}
