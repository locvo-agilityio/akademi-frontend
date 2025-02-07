import { render } from '@testing-library/react';

// Components
import TeacherDetail from '..';

// Mocks
import { MOCK_TEACHERS } from '@/__mocks__';

jest.mock('@/hooks', () => ({
  useGetTeacher: jest.fn(() => ({
    teacher: MOCK_TEACHERS[0],
  })),
}));

describe('TeacherDetail', () => {
  it('should render successfully', () => {
    const { container } = render(<TeacherDetail />);

    expect(container).toMatchSnapshot();
  });
});
