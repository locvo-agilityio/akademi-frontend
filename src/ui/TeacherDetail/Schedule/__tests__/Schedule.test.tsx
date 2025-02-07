import { render } from '@testing-library/react';

// Components
import Schedule from '..';

// Mocks
import { MOCK_TEACHER_SCHEDULES } from '@/__mocks__';

describe('Schedule Teacher', () => {
  it('should render default value successfully', () => {
    const { container } = render(<Schedule />);

    expect(container).toBeInTheDocument();
  });

  it('should render value successfully', () => {
    const { container } = render(
      <Schedule schedules={MOCK_TEACHER_SCHEDULES} />,
    );

    expect(container).toBeInTheDocument();
  });
});
