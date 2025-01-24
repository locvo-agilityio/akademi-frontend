import { MOCK_TEACHERS } from '@/__mocks__';
import { usePagination } from '../usePagination';
import { formatPageArray } from '@/utils';
import { act, renderHook } from '@testing-library/react';
import { TPagination } from '@/types';

jest.mock('@/utils', () => ({
  formatPageArray: jest.fn(),
  formatDate: jest.fn(),
}));

describe('usePagination', () => {
  const setCurrentPageMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockData = {
    meta: {
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 3,
        total: 30,
      },
    },
    next: 2,
    prev: 1,
    data: MOCK_TEACHERS,
  };

  it('should initialize with correct values', () => {
    (formatPageArray as jest.Mock).mockReturnValue([1, 2]);

    const { result } = renderHook(() =>
      usePagination(mockData, 1, setCurrentPageMock),
    );

    expect(result.current.pageArray).toEqual([1, 2]);
    expect(result.current.isDisableNext).toBe(false);
    expect(result.current.isDisablePrev).toBe(true);
  });

  it('should change page number correctly', () => {
    const { result } = renderHook(() =>
      usePagination(mockData, 1, setCurrentPageMock),
    );

    act(() => {
      result.current.handleChangePageNumber(3);
    });

    expect(setCurrentPageMock).toHaveBeenCalledWith(3);
  });

  it('should handle page change correctly', () => {
    const { result } = renderHook(() =>
      usePagination(mockData, 2, setCurrentPageMock),
    );

    act(() => {
      result.current.handleChangePage('next');
    });

    expect(setCurrentPageMock).toHaveBeenCalledWith(3);

    act(() => {
      result.current.handleChangePage('prev');
    });

    expect(setCurrentPageMock).toHaveBeenCalledWith(1);
  });

  it('should disable prev button when on the first page', () => {
    const { result } = renderHook(() =>
      usePagination(mockData, 1, setCurrentPageMock),
    );

    expect(result.current.isDisablePrev).toBe(true);
  });

  it('handle data pageCount and next not found', () => {
    const mockData = {
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          total: 30,
        },
      },
      prev: 1,
      data: MOCK_TEACHERS,
    } as TPagination<unknown>;
    const { result } = renderHook(() =>
      usePagination(mockData, 1, setCurrentPageMock),
    );

    expect(result.current.isDisablePrev).toBe(true);
  });
});
