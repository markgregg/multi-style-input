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
  const [visibility, setVisibility] = React.useState<'hidden' | 'visible'>(
    'hidden',
  );
  const [top, setTop] = React.useState<number>(0);
  const [left, setLeft] = React.useState<number>(0);

  const mouseEnter = React.useCallback(() => {
    setTimeout(() => {
      setVisibility('hidden');
    }, 1);
  }, [setVisibility]);

  const mouseLeave = React.useCallback(() => {
    setVisibility(
      cursorPosition >= start && cursorPosition <= end + 1
        ? 'hidden'
        : 'visible',
    );
  }, [setVisibility]);

  React.useEffect(() => {
    textElement.addEventListener('mouseleave', mouseLeave);
    setVisibility(
      cursorPosition >= start && cursorPosition <= end + 1
        ? 'hidden'
        : 'visible',
    );
    return () => {
      textElement.removeEventListener('mouseleave', mouseLeave);
    };
  }, [textElement, start, end, cursorPosition]);

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
