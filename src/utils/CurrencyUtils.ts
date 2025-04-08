import currency from 'currency.js';

export const formatCurrency = (amount: number): string => {
  if (amount === undefined) return '$--.--';
  
  return currency(amount, {
    symbol: '$',
    decimal: '.',
    separator: ',',
    precision: 2,
    pattern: '!#'
  }).format();
};

export const addCurrency = (amount1: number, amount2: number): number => {
  return currency(amount1).add(amount2).value;
};

export const subtractCurrency = (amount1: number, amount2: number): number => {
  return currency(amount1).subtract(amount2).value;
};

export const multiplyCurrency = (amount: number, multiplier: number): number => {
  return currency(amount).multiply(multiplier).value;
};

export const divideCurrency = (amount: number, divisor: number): number => {
  return currency(amount).divide(divisor).value;
};
