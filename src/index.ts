// @ts-ignore
import $ from 'cash-dom';

export const draw = (selector: string, jsonString: string): void => {
  const container = $(selector);
  console.log(container);
  console.log(selector);
  console.log(jsonString);
};

export const getJsonData = (): string => {
  return '{}';
};
