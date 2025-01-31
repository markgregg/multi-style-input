import { ComponentProps } from './componentProps';
import { DropDownOptions } from './dropDownOptions';

export interface DecoratedBlock {
  /* unique id to identify the block */
  id: string;
  /* start position in characters */
  start: number;
  /* length in characters */
  length: number;
  /* css style to apply to the block */
  style?: string;
  /* component to render */
  Decorator?: React.ComponentType<ComponentProps>;
  /* component's classname */
  clasName?: string;
  /* css style to apply on the component */
  decoratorStyle?: React.CSSProperties;
  /* custom properties to provide to the component */
  customProps?: any;
  dropDown?: DropDownOptions;
}
