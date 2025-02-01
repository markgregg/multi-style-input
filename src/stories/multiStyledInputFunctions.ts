export const tickerRegEx = /[A-Z]/;
export const isinPatialRegEx = /[A-Z]{2}[-]{0,1}[0-9]/;
export const isinRegEx = /[A-Z]{2}[-]{0,1}[0-9A-Z]{8}[-]{0,1}[0-9]/;
export const isinCodes = [
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

export const tickers = [
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

export const isSize = (text: string): boolean => {
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

export const isPrice = (text: string): boolean => {
  if (Text.length > 2 && text.includes('.')) {
    return !Number.isNaN(Number.parseFloat(text));
  }
  return false;
};

export const lastIndexOf = (text: string, chars: string, position?: number) => {
  for (let index = position ?? text.length - 1; index >= 0; index -= 1) {
    const ch = text[index];
    if (chars.includes(ch)) {
      return index + 1;
    }
  }
  return undefined;
};
