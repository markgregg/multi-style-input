import * as React from 'react';
import { ComponentProps } from '@/types/componentProps';
import s from './style.module.less';

export default function TitleDecorator({
  customProps,
  textElement,
  clasName,
  style,
  size,
}: ComponentProps) {
  const divRef = React.useRef<HTMLDivElement | null>(null);
  const [visibility, setVisibility] = React.useState<'hidden' | 'visible'>(
    'hidden',
  );
  const hideTimer = React.useRef<NodeJS.Timeout | null>(null);

  const { title, position = 'top' } = customProps;

  const mouseEnter = React.useCallback(() => {
    setTimeout(() => {
      setVisibility('visible');
      if (hideTimer.current) {
        clearTimeout(hideTimer.current);
        hideTimer.current = null;
      }
    }, 1);
  }, [setVisibility]);

  const mouseLeave = React.useCallback(() => {
    hideTimer.current = setTimeout(() => {
      setVisibility('hidden');
      hideTimer.current = null;
    }, 200);
  }, [setVisibility]);

  React.useEffect(() => {
    textElement.addEventListener('mouseenter', mouseEnter);
    textElement.addEventListener('mouseleave', mouseLeave);
    return () => {
      textElement.removeEventListener('mouseenter', mouseEnter);
      textElement.removeEventListener('mouseleave', mouseLeave);
    };
  }, [textElement]);

  return (
    <div
      ref={divRef}
      className={[s.pillDecorator, s[`font-${size}`], clasName ?? ''].join(' ')}
      style={{
        visibility,
        top:
          position === 'top'
            ? (divRef.current?.clientHeight ?? 18) * -1
            : textElement.offsetHeight,
        left: 0,
        ...style,
      }}
      onMouseEnter={() => mouseEnter()}
      onMouseLeave={() => mouseLeave()}
    >
      <span
        style={{
          fontSize: '9px',
          padding: '2px 8px 2px 7px',
        }}
      >
        {title}
      </span>
    </div>
  );
}
