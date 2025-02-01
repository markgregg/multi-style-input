import { ComponentProps } from '../componentProps';
import { DecoratedBlock } from '../decoratedBlock';
import { DropDownOptions } from '../dropDownOptions';
import { InputSize } from '../multiStyleInputProps';

export interface TextElement {
    text: string;
    start: number;
    end: number;
}
export interface StyledTextElement extends TextElement {
    id: string;
    style?: string;
}
export interface DecoratedElement extends TextElement {
    id: string;
    top: number;
    left: number;
    width: number;
    height: number;
    Decorator: React.ComponentType<ComponentProps>;
    textElement: HTMLElement;
    clasName?: string;
    decoratorStyle?: React.CSSProperties;
    customProps?: any;
}
export interface DropDownListElement {
    id: string;
    top: number;
    left: number;
    width: number;
    height: number;
    dropDown: DropDownOptions;
}
export interface DecoratedBlockState {
    text: string;
    textBlocks: DecoratedBlock[];
    parentElement: HTMLPreElement | null;
    customElements: DecoratedElement[];
    dropDown: DropDownListElement | null;
    caretPosition: number;
    currentSize: InputSize;
    setParantElement: (parentElement: HTMLPreElement) => void;
    updateText: (text: string) => void;
    updateCaretPosition: (caretPosition: number) => void;
    update: (text: string, textBlocks: DecoratedBlock[], size: InputSize) => void;
}
