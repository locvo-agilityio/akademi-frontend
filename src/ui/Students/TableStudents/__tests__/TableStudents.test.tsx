import { render } from '@testing-library/react';
import { BrowserRouter, useSearchParams } from 'react-router-dom';

import TableStudents from '..';

import { MOCK_STUDENTS } from '@/__mocks__';

const mockHandleDeleteStudent = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useGetStudents: jest.fn(() => ({
    students: {
      data: MOCK_STUDENTS,
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 3,
          total: 30,
        },
      },
    },
    isStudentsLoading: false,
  })),
  useDeleteStudent: jest.fn(() => ({
    handleDeleteStudent: mockHandleDeleteStudent,
    isDeleteLoading: false,
  })),

  usePagination: jest.fn(() => ({
    pageArray: [1, 2],
    isDisableNext: false,
    isDisablePrev: true,
    handleChangePageNumber: jest.fn(),
    handleChangePage: jest.fn(),
  })),
}));

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useTransition: () => [false, jest.fn()],
  useOptimistic: () => [MOCK_STUDENTS, jest.fn()],
}));

describe('Table Students', () => {
  const mockSetSearchParams = jest.fn();
  const mockSearchParams = new URLSearchParams({ key: 'value' });

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { container } = render(
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <TableStudents />
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});
