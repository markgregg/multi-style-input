import React from 'react';
import { SmartInput } from '@/components';
import s from './style.module.less';
import { DecoratedBlock } from '@/types';
import { PillDecorator } from '../PillDecorator';
import TitleDecorator from '../TitleDecorator/TitleDecorator';
import { DropDown } from '../DropDown';

const tickerRegEx = /[A-Z]/;
const isinPatialRegEx = /[A-Z]{2}[-]{0,1}[0-9]/;
const isinRegEx = /[A-Z]{2}[-]{0,1}[0-9A-Z]{8}[-]{0,1}[0-9]/;
const isinCodes = [
  'FR0127717439',
  'FR0127733782',
  'IT0004534522',
  'IT0004534530',
  'IT0004534548',
  'IT0004534555',
  'IT0004534571',
  'IT0004534589',
  'IT0004534605',
  'IT0004545890',
  'IT0004548282',
  'IT0004548290',
  'IT0004548308',
  'FR0127694406',
  'FR0127694349',
  'FR0013053329',
  'FR0127739029',
  'XS2421195848',
  'XS2430047212',
  'XS2430287362',
  'XS2430287529',
  'XS2398750922',
  'XS2343528571',
  'XS2344772426',
  'XS2499654643',
  'AT000B066055',
  'AT000B088455',
  'AT0000A20877',
  'XS1966819226',
  'XS1966037860',
  'AT000B126958',
  'AT000B014642',
  'AT000B126966',
  'AT0000A282J7',
  'AT0000A28603',
  'AT0000A286S9',
  'AT000B093190',
];

const tickers = [
  'ABD',
  'BDA',
  'CAT',
  'DE',
  'EGG',
  'FAN',
  'GAF',
  'HI',
  'INN',
  'JAK',
  'LON',
  'MON',
  'NO',
  'OPO',
  'PAR',
  'QAR',
  'RAT',
  'SEA',
  'TUN',
  'URN',
  'VAN',
  'WX',
  'YY',
  'ZEN',
];

const isSize = (text: string): boolean => {
  if (text.length > 2 && !text.includes('.')) {
    const postfix = text.toLocaleLowerCase()[text.length - 1];
    if (postfix === 'm' || postfix === 'k') {
      const number = Number(text.substring(0, text.length - 1));
      return !Number.isNaN(Number(number));
    }
    return !Number.isNaN(Number(text));
  }
  return false;
};

const isPrice = (text: string): boolean => {
  if (Text.length > 2 && text.includes('.')) {
    return !Number.isNaN(Number.parseFloat(text));
  }
  return false;
};

const lastIndexOf = (text: string, chars: string, position?: number) => {
  for (let index = position ?? text.length - 1; index >= 0; index -= 1) {
    const ch = text[index];
    if (chars.includes(ch)) {
      return index + 1;
    }
  }
  return undefined;
}


export const SmartInputApp = () => {

  const [text, setText] = React.useState<string>('');
  const [textBlocks, setTextBlocks] = React.useState<DecoratedBlock[]>([]);

  const applyChange = React.useCallback((newText: string, position: number, updateTokens?: boolean) => {
    const start = position === 0
      ? position
      : lastIndexOf(newText, ' \n\r\t', position) ?? 0;
    const tokens = newText.substring(start).split(/ |\n|\r|\t/);
    const tempBlocks = textBlocks.filter(
      (b) => (b.start + b.length < start),
    );
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
          const matchedIsins = isinCodes.filter((code) => code.includes(token));
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
          const matchedTickers = tickers.filter((code) => code.includes(token));
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
  }, [text, textBlocks]);

  const handleTextChange = React.useCallback((newText: string, position: number) => {
    applyChange(newText, position, true);
  }, [applyChange, text, textBlocks]);

  const handlePositionChange = React.useCallback((position: number) => {
    applyChange(text, position);
  }, [applyChange, text, textBlocks]);

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

  const handleOptionSelection = React.useCallback((id: string, option: string) => {
    const editBlock = textBlocks.find((b) => b.id === id);
    if (editBlock) {
      const newText =
        text.substring(0, editBlock.start) +
        option +
        text.substring(editBlock.start + editBlock.length);
      applyChange(newText, editBlock.start, true);
    }
  }, [textBlocks, text, applyChange]);

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
