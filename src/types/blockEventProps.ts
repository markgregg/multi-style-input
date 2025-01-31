export interface SmartElementMouseEvent {
  event: MouseEvent;
  id?: string;
  blockText?: string;
}

export interface BlockEventProps {
  onBlockClick?: (event: SmartElementMouseEvent) => void;
  onBlockDblClick?: (event: SmartElementMouseEvent) => void;
  onBlockMouseDown?: (event: SmartElementMouseEvent) => void;
  onBlockMouseUp?: (event: SmartElementMouseEvent) => void;
  onBlockMouseEnter?: (event: SmartElementMouseEvent) => void;
  onBlockMouseLeave?: (event: SmartElementMouseEvent) => void;
  onBlockMouseOver?: (event: SmartElementMouseEvent) => void;
}
