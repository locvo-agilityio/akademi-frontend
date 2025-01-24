import {
  formatAmount,
  formatNumberButton,
  formatPageArray,
} from '../converter';

describe('formatAmount', () => {
  it('should format the amount with commas as thousands separators', () => {
    expect(formatAmount(1000)).toBe('1,000');
    expect(formatAmount(123456789)).toBe('123,456,789');
  });
});

describe('formatNumberButton', () => {
  it('should return an array of numbers from 1 to the specified number', () => {
    expect(formatNumberButton(1)).toEqual([1]);
    expect(formatNumberButton(3)).toEqual([1, 2, 3]);
    expect(formatNumberButton(5)).toEqual([1, 2, 3, 4, 5]);
  });

  it('should return an empty array if the input number is 0', () => {
    expect(formatNumberButton(0)).toEqual([]);
  });
});

describe('formatPageArray', () => {
  const DOTS = '...';

  it('should return [1] if totalPage is 0', () => {
    expect(formatPageArray({ totalPage: 0, currentPage: 1 })).toEqual([1]);
  });

  it('should return a range of pages if totalPage is less than or equal to 4', () => {
    expect(formatPageArray({ totalPage: 3, currentPage: 1 })).toEqual([
      1, 2, 3,
    ]);
    expect(formatPageArray({ totalPage: 4, currentPage: 2 })).toEqual([
      1, 2, 3, 4,
    ]);
  });

  it('should return the correct pagination array when the current page is near the start', () => {
    expect(formatPageArray({ totalPage: 10, currentPage: 1 })).toEqual([
      1,
      2,
      3,
      DOTS,
      10,
    ]);
    expect(formatPageArray({ totalPage: 10, currentPage: 2 })).toEqual([
      1,
      2,
      3,
      DOTS,
      10,
    ]);
    expect(formatPageArray({ totalPage: 10, currentPage: 3 })).toEqual([
      1,
      2,
      3,
      DOTS,
      10,
    ]);
  });

  it('should return the correct pagination array when the current page is near the end', () => {
    expect(formatPageArray({ totalPage: 10, currentPage: 8 })).toEqual([
      1,
      DOTS,
      8,
      9,
      10,
    ]);
    expect(formatPageArray({ totalPage: 10, currentPage: 9 })).toEqual([
      1,
      DOTS,
      8,
      9,
      10,
    ]);
    expect(formatPageArray({ totalPage: 10, currentPage: 10 })).toEqual([
      1,
      DOTS,
      8,
      9,
      10,
    ]);
  });

  it('should return the correct pagination array when the current page is in the middle', () => {
    expect(formatPageArray({ totalPage: 10, currentPage: 5 })).toEqual([
      1,
      DOTS,
      4,
      5,
      6,
      DOTS,
      10,
    ]);
    expect(formatPageArray({ totalPage: 10, currentPage: 6 })).toEqual([
      1,
      DOTS,
      5,
      6,
      7,
      DOTS,
      10,
    ]);
  });

  it('should handle edge cases like totalPage = 1', () => {
    expect(formatPageArray({ totalPage: 1, currentPage: 1 })).toEqual([1]);
  });
});
