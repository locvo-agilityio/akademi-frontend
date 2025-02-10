import { fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter, useSearchParams } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

// Mocks
import { MOCK_TEACHERS } from '@/__mocks__';

// Hooks
import { useGetTeachers } from '@/hooks';

// Components
import ListTeachers from '..';

const mockHandleDeleteTeacher = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useGetTeachers: jest.fn(() => ({
    teachers: {
      data: MOCK_TEACHERS,
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 3,
          total: 30,
        },
      },
    },
    isTeachersLoading: false,
  })),
  useDeleteTeacher: jest.fn(() => ({
    handleDeleteTeacher: mockHandleDeleteTeacher,
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
  useOptimistic: () => [{ data: MOCK_TEACHERS }, jest.fn()],
}));

describe('List Teachers', () => {
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
        <ListTeachers />
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it('should render empty data', () => {
    (useGetTeachers as jest.Mock).mockReturnValue(() => ({
      teachers: {
        data: [],
        meta: {
          pagination: {
            page: 1,
            pageSize: 10,
            pageCount: 3,
            total: 30,
          },
        },
      },
      isTeachersLoading: false,
    }));

    const { container } = render(
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <ListTeachers />
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });

  it('handles teacher deletion', async () => {
    const { getAllByTitle, getAllByText, getByText, getByRole } = render(
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <ListTeachers />
      </BrowserRouter>,
    );

    const dropdown = getAllByTitle('Dropdown')[0];

    fireEvent.click(dropdown);

    await userEvent.click(getAllByText('Delete')[0]);

    expect(
      getByText('Are you sure you want to delete this teacher?'),
    ).toBeInTheDocument();

    const confirmButton = getByRole('button', { name: 'Confirm' });

    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockHandleDeleteTeacher).toHaveBeenCalled();
    });
  });

  it('handle click card detail', async () => {
    const { getByText, container } = render(
      <BrowserRouter
        future={{ v7_relativeSplatPath: true, v7_startTransition: true }}
      >
        <ListTeachers />
      </BrowserRouter>,
    );

    const card = getByText('Dimitres Viga');

    fireEvent.click(card);

    expect(container).toBeInTheDocument();
  });
});
