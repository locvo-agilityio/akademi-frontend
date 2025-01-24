import { render } from '@testing-library/react';

// Components
import StudentForm from '..';

// Mocks
import { MOCK_STUDENTS } from '@/__mocks__';

// Hooks
import { useGetStudent } from '@/hooks';

jest.mock('@/hooks', () => ({
  useGetStudent: jest.fn(() => ({
    student: MOCK_STUDENTS[0],
    isStudentLoading: false,
  })),
}));

describe('StudentForm', () => {
  it('should render successfully', () => {
    const { container } = render(<StudentForm />);

    expect(container).toMatchSnapshot();
  });

  it('should render fallbackUI when loading', () => {
    (useGetStudent as jest.Mock).mockReturnValue({
      student: null,
      isStudentLoading: true,
    });

    const { container } = render(<StudentForm />);

    expect(container).toBeInTheDocument();
  });
});
