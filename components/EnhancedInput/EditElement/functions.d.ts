export declare const findChangePosition: (oldText: string, newText: string) => number;
export declare const getCursorPosition: (pre: HTMLPreElement | null) => number;
export declare const setCursorPosition: (pre: HTMLPreElement, position: number) => void;
export declare const findEndOfChange: (text: string, newText: string) => number | null;
export declare const getDomText: (element: HTMLElement) => string;
export declare const trimCR: (text: string) => string;
