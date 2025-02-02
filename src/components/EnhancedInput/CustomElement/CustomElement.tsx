import React from 'react';
import { useBlockStore, useConfig, useViewPort } from '@/state/useState';
import { DecoratedElement } from '@/types/State';
import s from './style.module.less';

interface CustomElementProps {
  element: DecoratedElement;
}
export const CustomElement = React.memo(
  ({
    element: {
      text,
      start,
      end,
      id,
      top,
      left,
      width,
      height,
      Decorator,
      textElement,
      clasName,
      decoratorStyle,
      customProps,
    },
  }: CustomElementProps) => {
    const size = useConfig((state) => state.size);
    const { top: clientTop, left: clientLeft } = useViewPort((state) => state);
    const caretPosition = useBlockStore((state) => state.caretPosition);

    return (
      <div
        className={s.customElement}
        style={{
          left: left - clientLeft,
          top: top - clientTop,
          width,
          height:
            top - clientTop + height < height
              ? height
              : height - (top - clientTop),
        }}
      >
        {Decorator && (
          <Decorator
            id={id}
            clasName={clasName}
            text={text}
            start={start}
            end={end}
            cursorPosition={caretPosition}
            textElement={textElement}
            customProps={customProps}
            size={size}
            style={decoratorStyle}
          />
        )}
      </div>
    );
  },
);
