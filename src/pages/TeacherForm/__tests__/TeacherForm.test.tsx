import { render } from '@testing-library/react';

// Components
import TeacherForm from '..';

// Mocks
import { MOCK_TEACHERS } from '@/__mocks__';

// Hooks
import { useGetTeacher } from '@/hooks';

jest.mock('@/hooks', () => ({
  useGetTeacher: jest.fn(() => ({
    teacher: MOCK_TEACHERS[0],
    isTeacherLoading: false,
  })),
}));

describe('TeacherForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { container } = render(<TeacherForm />);

    expect(container).toMatchSnapshot();
  });

  it('should render fallbackUI when loading', () => {
    (useGetTeacher as jest.Mock).mockReturnValue({
      teacher: null,
      isTeacherLoading: true,
    });

    const { container } = render(<TeacherForm />);

    expect(container).toBeInTheDocument();
  });
});
