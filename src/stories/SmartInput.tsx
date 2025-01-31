import React from 'react';
import { SmartInput as SmartInputComp } from '@/components';
import { DropDown } from '@/TestApp/components/DropDown';
import { DecoratedBlock } from '@/types';
import {
  isinCodes,
  isinPatialRegEx,
  isinRegEx,
  isPrice,
  isSize,
  lastIndexOf,
  tickerRegEx,
  tickers,
} from './smartInputFunctions';
import { PillDecorator } from '@/TestApp/components/PillDecorator';
import TitleDecorator from '@/TestApp/components/TitleDecorator/TitleDecorator';
import s from './style.module.less';

export interface SmartInputProps {
  /* Example width */
  exampleWidth?: number;
  /* Example height */
  exampleHeight?: number;
  tabIndex?: number;
  onItemSelected?: (id: string, option: string) => void;
  onChange?: (text: string, position: number) => void;
  onCaretPositionChange?: (position: number) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  onClick?: (event: React.MouseEvent) => void;
  onDoubleClick?: (event: React.MouseEvent) => void;
  onMouseDown?: (event: React.MouseEvent) => void;
  onMouseUp?: (event: React.MouseEvent) => void;
  onMouseEnter?: (event: React.MouseEvent) => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onMouseOver?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onKeyUp?: (event: React.KeyboardEvent) => void;
}

/** Primary UI component for user interaction */
export const SmartInput: React.FC<SmartInputProps> = ({
  onChange,
  onCaretPositionChange,
  onItemSelected,
  ...props
}: SmartInputProps) => {
  const [text, setText] = React.useState<string>('');
  const [textBlocks, setTextBlocks] = React.useState<DecoratedBlock[]>([]);

  const applyChange = React.useCallback(
    (newText: string, position: number, updateTokens?: boolean) => {
      const start =
        position === 0
          ? position
          : (lastIndexOf(newText, ' \n\r\t', position) ?? 0);
      const tokens = newText.substring(start).split(/ |\n|\r|\t/);
      const tempBlocks = textBlocks.filter((b) => b.start + b.length < start);
      const style = 'font-style: italic;font-weight: bold;';
      let pos = start;
      tokens.forEach((token) => {
        if (token.match(isinRegEx)) {
          if (updateTokens) {
            if (isinCodes.includes(token.toUpperCase())) {
              tempBlocks.push({
                id: `isin${pos}`,
                start: pos,
                length: token.length,
                style,
                Decorator: PillDecorator,
                decoratorStyle: {
                  backgroundColor: 'rgb(68, 68, 68)',
                  color: 'white',
                },
              });
            } else {
              tempBlocks.push({
                id: `isin${pos}`,
                start: pos,
                length: token.length,
                style,
                Decorator: PillDecorator,
                decoratorStyle: {
                  backgroundColor: 'rgb(154, 61, 55)',
                  color: 'white',
                },
              });
            }
          }
        } else if (tickers.includes(token)) {
          if (updateTokens) {
            tempBlocks.push({
              id: `ticker${pos}`,
              start: pos,
              length: token.length,
              style,
              Decorator: PillDecorator,
              decoratorStyle: {
                backgroundColor: 'rgb(68, 68, 68)',
                color: 'white',
              },
            });
          }
        } else if (isSize(token)) {
          if (updateTokens) {
            tempBlocks.push({
              id: `vol${pos}`,
              start: pos,
              length: token.length,
              style,
              customProps: 'Size',
              Decorator: TitleDecorator,
              decoratorStyle: {
                backgroundColor: 'rgb(68, 68, 68)',
                color: 'white',
                fontWeight: 'bold',
              },
            });
          }
        } else if (isPrice(token)) {
          if (updateTokens) {
            tempBlocks.push({
              id: `prc${pos}`,
              start: pos,
              length: token.length,
              style,
              Decorator: PillDecorator,
              decoratorStyle: {
                backgroundColor: 'rgb(68, 68, 68)',
                color: 'white',
                fontWeight: 'bold',
              },
            });
          }
        } else if (
          position >= pos &&
          position <= pos + token.trimEnd().length &&
          token[position] !== ''
        ) {
          if (token.match(isinPatialRegEx)) {
            const matchedIsins = isinCodes.filter((code) =>
              code.includes(token),
            );
            if (matchedIsins.length > 0) {
              tempBlocks.push({
                id: 'bad-edit',
                start: pos,
                length: token.length,
                style: 'font-style: italic;font-weight: bold;',
                dropDown: {
                  activation: 'cursorposition',
                  options: matchedIsins.slice(0, 5),
                },
              });
            }
          } else if (token.match(tickerRegEx)) {
            const matchedTickers = tickers.filter((code) =>
              code.includes(token),
            );
            if (matchedTickers.length > 0) {
              tempBlocks.push({
                id: 'bad-edit',
                start: pos,
                length: token.length,
                style: 'font-style: italic;font-weight: bold;',
                dropDown: {
                  activation: 'cursorposition',
                  options: matchedTickers.slice(0, 5),
                },
              });
            }
          }
        }
        pos = pos + token.length + 1;
      });

      if (JSON.stringify(tempBlocks) !== JSON.stringify(textBlocks)) {
        setTextBlocks(tempBlocks);
      }
      if (text !== newText) {
        setText(newText);
      }
    },
    [text, textBlocks],
  );

  const handleTextChange = React.useCallback(
    (newText: string, position: number) => {
      applyChange(newText, position, true);
      if (onChange) {
        onChange(newText, position);
      }
    },
    [applyChange, text, textBlocks],
  );

  const handlePositionChange = React.useCallback(
    (position: number) => {
      applyChange(text, position);
      if (onCaretPositionChange) {
        onCaretPositionChange(position);
      }
    },
    [applyChange, text, textBlocks],
  );

  const updatedBlocks = React.useMemo(
    () =>
      textBlocks.map((b) =>
        !b.customProps
          ? b
          : {
              ...b,
              customProps: { title: b.customProps, position: 'top' },
            },
      ),
    [textBlocks],
  );

  const handleOptionSelection = React.useCallback(
    (id: string, option: string) => {
      const editBlock = textBlocks.find((b) => b.id === id);
      if (editBlock) {
        const newText =
          text.substring(0, editBlock.start) +
          option +
          text.substring(editBlock.start + editBlock.length);
        applyChange(newText, editBlock.start, true);
      }
      if (onItemSelected) {
        onItemSelected(id, option);
      }
    },
    [textBlocks, text, applyChange],
  );

  return (
    <div className={s.smartFilterPage}>
      <h4>Smart Input</h4>
      <div className={s.filterBar}>
        <SmartInputComp
          text={text}
          textBlocks={updatedBlocks}
          onChange={handleTextChange}
          onCaretPositionChange={handlePositionChange}
          DropDownComponent={DropDown}
          onItemSelected={handleOptionSelection}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
        />
      </div>
    </div>
  );
};
