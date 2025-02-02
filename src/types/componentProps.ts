import { InputSize } from './multiStyleInputProps';

export interface ComponentProps {
  /* unique id for the component */
  id: string;
  /* css classname */
  clasName?: string;
  /* css properties */
  style?: React.CSSProperties;
  /* text at the components location */
  text: string;
  /* start position in characters */
  start: number;
  /* end position in characters */
  end: number;
  /* current position of the cursor */
  cursorPosition: number;
  size?: InputSize;
  /* html element the component is attached to */
  textElement: HTMLElement;
  /* custom properties */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customProps?: any;
}
