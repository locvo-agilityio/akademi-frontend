import { render } from '@testing-library/react';

// Components
import StudentDetail from '..';

// Mocks
import { MOCK_TEACHERS, MOCK_UNPAID_STUDENTS } from '@/__mocks__';

jest.mock('@/hooks', () => ({
  useGetStudent: jest.fn(() => ({
    student: MOCK_TEACHERS[0],
  })),
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

describe('StudentDetail', () => {
  it('should render successfully', () => {
    const { container } = render(<StudentDetail />);

    expect(container).toMatchSnapshot();
  });
});
