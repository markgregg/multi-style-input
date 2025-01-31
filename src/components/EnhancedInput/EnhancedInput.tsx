import React from 'react';
import s from './style.module.less';
import { EditElement } from './EditElement';
import {
  useBlockStore,
  useConfig,
  useManaged,
  useViewPort,
} from '@/state/useState';
import { DropDown } from './DropDown';

export const EnhancedInput = React.memo(() => {
  const { tabIndex } = useConfig((state) => state);
  const { customElements, dropDown, caretPosition, update } = useBlockStore(
    (state) => state,
  );
  const { top, left, height } = useViewPort((state) => state);
  const { text, textBlocks } = useManaged((state) => state);

  React.useEffect(() => update(text, textBlocks), [text, textBlocks]);

  const visibleElements = React.useMemo(
    () =>
      customElements.filter(
        (element) =>
          element.top - top + element.height >= 0 &&
          element.top - left <= height,
      ),
    [customElements, height, top, left],
  );

  return (
    <div
      tabIndex={tabIndex ?? -1}
      id="si-enhanced-Input"
      className={s.enhancedInput}
    >
      <EditElement />
      {visibleElements.map((element) => (
        <div
          key={element.id}
          style={{
            position: 'absolute',
            lineHeight: 'normal',
            left: element.left - left,
            top: element.top - top,
            width: element.width,
            height:
              element.top - top + element.height < height
                ? element.height
                : height - (element.top - top),
          }}
        >
          <element.Decorator
            id={element.id}
            text={element.text}
            start={element.start}
            end={element.end}
            cursorPosition={caretPosition}
            textElement={element.textElement}
            customProps={element.customProps}
            style={element.decoratorStyle}
          />
        </div>
      ))}
      {dropDown && <DropDown />}
    </div>
  );
});
