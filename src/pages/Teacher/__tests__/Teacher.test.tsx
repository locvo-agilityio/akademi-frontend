import { render } from '@testing-library/react';
import { BrowserRouter, useSearchParams } from 'react-router-dom';

// Components
import Teacher from '..';

// Mocks
import { MOCK_TEACHERS } from '@/__mocks__';

const mockHandleDeleteTeacher = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: jest.fn(),
}));

jest.mock('@/hooks', () => ({
  useGetTeacher: jest.fn(() => ({
    students: {
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
    isStudentsLoading: false,
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

describe('Teacher', () => {
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
      <BrowserRouter>
        <Teacher />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
