import React from 'react';
import {
  useBlockStore,
  useConfig,
  useOptions,
  useViewPort,
} from '@/state/useState';
import s from './style.module.less';

export const DropDown = React.memo(() => {
  const { DropDownComponent, onItemSelected } = useConfig((state) => state);
  const {
    id,
    top,
    left,
    dropDown: { activation, options = [] } = {},
  } = useBlockStore((state) => state.dropDown) ?? {};
  const { top: clientTop, left: clientLeft } = useViewPort((state) => state);
  const { activeOptionIdx, setOptions, setActiveOption } = useOptions(
    (state) => state,
  );

  React.useEffect(() => {
    setOptions(options);
  }, [options]);

  /* move to assoicated text element */
  const handleLeftMouseDown = React.useCallback(() => {
    if (activation === 'mouseover') {
      // hideDropDown();
    }
  }, [activation]);

  const handleMouseEnter = React.useCallback(() => {
    if (activation === 'mouseover') {
      // setTimeout(() => showDropDown(activeDropDown.id), 1);
    }
  }, [activation]);

  const handleOptionSelected = React.useCallback((option: string) => {
    if (onItemSelected) {
      onItemSelected(id ?? '', option);
    }
  }, []);

  const handleActiveOptionChanged = React.useCallback((index: number) => {
    setActiveOption(index);
  }, []);

  return (
    <div
      className={s.dropDown}
      style={{
        top: (top ?? 0) - clientTop,
        left: (left ?? 0) - clientLeft,
      }}
    >
      {DropDownComponent && (
        <DropDownComponent
          onMouseLeftDropDown={handleLeftMouseDown}
          onMouseEnteredDropDown={handleMouseEnter}
          options={options}
          onOptionSelected={handleOptionSelected}
          activeIndex={activeOptionIdx}
          onActiveOptionChanged={handleActiveOptionChanged}
        />
      )}
    </div>
  );
});
