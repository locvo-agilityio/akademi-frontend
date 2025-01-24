import { render } from '@testing-library/react';

// Components
import Dashboard from '..';

// Mocks
import { MOCK_UNPAID_STUDENTS } from '@/__mocks__';

jest.mock('@/hooks', () => ({
  useGetUnpaidStudents: jest.fn(() => ({
    unpaidStudents: {
      data: MOCK_UNPAID_STUDENTS,
      meta: {
        pagination: {
          page: 1,
          pageSize: 10,
          pageCount: 3,
          total: 30,
        },
      },
    },
    isUnpaidStudentsLoading: false,
  })),
  usePagination: jest.fn(() => ({
    pageArray: [1, 2],
    isDisableNext: false,
    isDisablePrev: true,
    handleChangePageNumber: jest.fn(),
    handleChangePage: jest.fn(),
  })),
}));

describe('Dashboard', () => {
  it('should render successfully', () => {
    const { container } = render(<Dashboard />);

    expect(container).toMatchSnapshot();
  });
});
