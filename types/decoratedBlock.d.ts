import { ComponentProps } from './componentProps';
import { DropDownOptions } from './dropDownOptions';

export interface DecoratedBlock {
    id: string;
    start: number;
    length: number;
    style?: string;
    Decorator?: React.ComponentType<ComponentProps>;
    clasName?: string;
    decoratorStyle?: React.CSSProperties;
    customProps?: any;
    dropDown?: DropDownOptions;
}
