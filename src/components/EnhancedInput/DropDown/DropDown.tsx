import React from 'react';
import {
  useBlockStore,
  useConfig,
  useOptions,
  useViewPort,
} from '@/state/useState';
import s from './style.module.less';
import { DropDownListElement } from '@/types/State';
import { useExternalClicks } from '@/hooks/useExternalClicks';

interface DropDownProps {
  dropDown: DropDownListElement;
}

export const DropDown = React.memo(
  ({
    dropDown: {
      id,
      start,
      end,
      top,
      left,
      textElement,
      dropDown: { options, activation },
    },
  }: DropDownProps) => {
    const dropdownRef = React.useRef<HTMLDivElement | null>(null);
    const { size, DropDownComponent, onItemSelected } = useConfig(
      (state) => state,
    );
    const { top: clientTop, left: clientLeft } = useViewPort((state) => state);
    const {
      id: activeId,
      activeOptionIdx,
      setOptions,
      clearOptions,
      setActiveOption,
    } = useOptions((state) => state);
    const caretPosition = useBlockStore((state) => state.caretPosition);

    const clearDropDown = React.useCallback(() => {
      clearOptions();
    }, [clearOptions]);

    useExternalClicks(dropdownRef.current, clearDropDown);

    React.useEffect(() => {
      if (
        activation === 'cursorposition' &&
        caretPosition >= start &&
        caretPosition <= end
      ) {
        setOptions(id, options);
      }
    }, [caretPosition, start, end, activation]);

    React.useEffect(() => {
      const activateDropDown = () => {
        setOptions(id, options);
      };
      if (activation === 'mouseover') {
        textElement.addEventListener('mouseover', activateDropDown);
      }
      return () => {
        if (activation === 'mouseover') {
          textElement.removeEventListener('mouseover', activateDropDown);
        }
      };
    }, [textElement, activation]);

    const handleOptionSelected = React.useCallback(
      (option: string) => {
        if (onItemSelected) {
          clearOptions();
          onItemSelected(id ?? '', option);
        }
      },
      [clearOptions, onItemSelected],
    );

    const handleActiveOptionChanged = React.useCallback(
      (index: number) => {
        setActiveOption(index);
      },
      [setActiveOption],
    );

    return (
      <div
        ref={dropdownRef}
        className={s.dropDown}
        style={{
          top: (top ?? 0) - clientTop,
          left: (left ?? 0) - clientLeft,
        }}
      >
        {activeId === id && DropDownComponent && (
          <DropDownComponent
            size={size}
            options={options}
            onOptionSelected={handleOptionSelected}
            activeIndex={activeOptionIdx}
            onActiveOptionChanged={handleActiveOptionChanged}
          />
        )}
      </div>
    );
  },
);
