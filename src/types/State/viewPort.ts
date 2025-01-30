export interface ViewPortState {
    top: number;
    left: number;
    width: number;
    height: number;
    setPosition: (top: number, left: number) => void;
    setSize: (top: number, left: number) => void;
}