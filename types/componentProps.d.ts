export interface ComponentProps {
    id: string;
    clasName?: string;
    style?: React.CSSProperties;
    text: string;
    start: number;
    end: number;
    cursorPosition: number;
    textElement: HTMLElement;
    customProps?: any;
}
