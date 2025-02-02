import React from 'react';
import { DropDownProps } from '@/types';
import s from './style.module.less';

export const DropDown = ({
  options,
  size,
  onOptionSelected,
  activeIndex,
  onActiveOptionChanged,
}: DropDownProps) => {
  const optionChanged = React.useCallback(
    (index: number) => {
      if (onActiveOptionChanged) {
        onActiveOptionChanged(index);
      }
    },
    [onActiveOptionChanged],
  );

  const selectOption = React.useCallback(
    (option: string) => {
      onOptionSelected(option);
    },
    [onOptionSelected],
  );

  return (
    <div
      id="drop-down-list"
      className={[s.dropDownList, s[`font-${size}`]].join(' ')}
    >
      <ul
        aria-activedescendant={
          activeIndex !== null ? options[activeIndex] : undefined
        }
        role="listbox"
        tabIndex={-1}
      >
        {options.map((option, index) => (
          <li
            key={option}
            aria-selected={activeIndex === index}
            role="option"
            tabIndex={0}
            onClick={() => selectOption(option)}
            onMouseEnter={() => optionChanged(index)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};
