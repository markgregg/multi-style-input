import React from 'react';
import { DropDownProps } from '@/types';
import s from './style.module.less';

export const DropDown = ({
  options,
  onOptionSelected,
  activeIndex,
  onActiveOptionChanged,
  onMouseEnteredDropDown,
  onMouseLeftDropDown,
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
      className={s.dropDownList}
      onMouseEnter={onMouseEnteredDropDown}
      onMouseLeave={onMouseLeftDropDown}
    >
      <ul
        aria-activedescendant={options[activeIndex]}
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
