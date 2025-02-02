import React from 'react';
import { EditElement } from './EditElement';
import {
  useBlockStore,
  useConfig,
  useManaged,
  useViewPort,
} from '@/state/useState';
import { DropDown } from './DropDown';
import s from './style.module.less';
import { CustomElement } from './CustomElement';

export const EnhancedInput = React.memo(() => {
  const {
    tabIndex,
    className,
    style,
    size = 'normal',
  } = useConfig((state) => state);
  const { customElements, dropDowns, update } = useBlockStore((state) => state);
  const { top, left, height } = useViewPort((state) => state);
  const { text, textBlocks } = useManaged((state) => state);

  React.useEffect(
    () => update(text, textBlocks, size),
    [text, textBlocks, size],
  );

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
      className={[s.enhancedInput, s[`font-${size}`], className].join(' ')}
      style={style}
    >
      <div className={s.editArea}>
        <EditElement />
        {visibleElements.map((element) => (
          <CustomElement key={element.id} element={element} />
        ))}
        {dropDowns.map((dropDown) => (
          <DropDown key={dropDown.id} dropDown={dropDown} />
        ))}
      </div>
    </div>
  );
});
