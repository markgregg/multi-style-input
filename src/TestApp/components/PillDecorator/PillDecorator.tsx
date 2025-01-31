import * as React from 'react';
import s from './style.module.less';
import { ComponentProps } from '@/types/componentProps';

export const PillDecorator = ({
  textElement,
  text,
  start,
  end,
  cursorPosition,
  clasName,
  style,
}: ComponentProps) => {
  const divRef = React.useRef<HTMLDivElement | null>(null);
  const [mouseOver, setmouseOver] = React.useState<boolean>(false);
  const [top, setTop] = React.useState<number>(0);
  const [left, setLeft] = React.useState<number>(0);

  const visibility = React.useMemo(() => mouseOver || (cursorPosition >= start && cursorPosition <= end) ? 'hidden' : 'visible',
    [mouseOver, cursorPosition, start, end]
  );

  const mouseEnter = React.useCallback((event: React.MouseEvent) => {
    setmouseOver(true);
    event.stopPropagation();
  }, [mouseOver, setmouseOver]);

  const documentMouseOver = React.useCallback((event: MouseEvent) => {
    if (event.target !== textElement) {
      setmouseOver(false)
    }
  }, [setmouseOver, textElement]);

  React.useEffect(() => {
    if (mouseOver) {
      document.addEventListener("mouseover", documentMouseOver);
    }
    return () => {
      if (mouseOver) {
        document.removeEventListener("mouseover", documentMouseOver);
      }
    };
  }, [mouseOver]);

  React.useEffect(() => {
    if (divRef.current) {
      setTop(
        ((divRef.current.offsetHeight - textElement.offsetHeight) / 2) * -1,
      );
      setLeft(
        ((divRef.current.offsetWidth - textElement.offsetWidth) / 2) * -1,
      );
    }
  }, [textElement]);

  return (
    <div
      ref={divRef}
      className={[s.pillDecorator, clasName ?? ''].join(' ')}
      style={{
        top,
        left,
        visibility,
        ...style,
      }}
      onMouseEnter={mouseEnter}
    >
      {text}
    </div>
  );
}
