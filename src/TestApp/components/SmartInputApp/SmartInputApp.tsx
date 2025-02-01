import React from 'react';
import { SmartInput } from '@/components';
import { DecoratedBlock } from '@/types';
import { PillDecorator } from '../PillDecorator';
import TitleDecorator from '../TitleDecorator/TitleDecorator';
import { DropDown } from '../DropDown';
import {
  isinCodes,
  isinPatialRegEx,
  isinRegEx,
  isPrice,
  isSize,
  lastIndexOf,
  tickerRegEx,
  tickers,
} from '@/stories/smartInputFunctions';
import s from './style.module.less';

export const SmartInputApp = () => {
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
          newText[position] !== ''
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
    },
    [applyChange, text, textBlocks],
  );

  const handlePositionChange = React.useCallback(
    (position: number) => {
      applyChange(text, position);
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
        const newText = `${text.substring(0, editBlock.start)}${option}${text.substring(editBlock.start + editBlock.length)}`;
        applyChange(newText, editBlock.start, true);
      }
    },
    [textBlocks, text, applyChange],
  );

  return (
    <div className={s.smartFilterPage}>
      <h4>Smart Input</h4>
      <div className={s.filterBar}>
        <SmartInput
          text={text}
          textBlocks={updatedBlocks}
          onChange={handleTextChange}
          onCaretPositionChange={handlePositionChange}
          DropDownComponent={DropDown}
          onItemSelected={handleOptionSelection}
        />
      </div>
    </div>
  );
};
