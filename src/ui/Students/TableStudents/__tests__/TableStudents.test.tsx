import { fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import TableStudents from '..';

// Mocks
import { MOCK_STUDENTS } from '@/__mocks__';

const mockHandleDeleteStudent = jest.fn();
const mockUpdateOptimisticStudents = jest.fn();
const mockToast = jest.fn();

jest.mock('@chakra-ui/react', () => ({
  ...jest.requireActual('@chakra-ui/react'),
  useToast: jest.fn(() => mockToast),
}));

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
  useOptimistic: () => [{ data: MOCK_STUDENTS }, mockUpdateOptimisticStudents],
}));

describe('Table Students', () => {
  const mockSetSearchParams = jest.fn();
  const mockSearchParams = new URLSearchParams({ search: '' });

  beforeEach(() => {
    (useSearchParams as jest.Mock).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);

    Object.defineProperty(window.HTMLElement.prototype, 'scrollTo', {
      writable: true,
      value: jest.fn(),
    });
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

  it('handles student deletion', async () => {
    const { getAllByTitle, getAllByText, getByText, getByRole } = render(
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <TableStudents />
      </BrowserRouter>,
    );

    const dropdown = getAllByTitle('Dropdown')[0];

    fireEvent.click(dropdown);

    await userEvent.click(getAllByText('Delete')[0]);

    expect(
      getByText('Are you sure you want to delete this student?'),
    ).toBeInTheDocument();

    const confirmButton = getByRole('button', { name: 'Confirm' });

    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockHandleDeleteStudent).toHaveBeenCalled();
    });
  });
});
