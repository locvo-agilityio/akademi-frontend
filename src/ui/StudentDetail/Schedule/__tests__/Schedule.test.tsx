import { render } from '@testing-library/react';

// Components
import Schedule from '..';

// Mocks
import { MOCK_STUDENT_SCHEDULES } from '@/__mocks__';

describe('Schedule', () => {
  it('should snapshot default value', () => {
    const { container } = render(<Schedule />);

    expect(container).toBeInTheDocument();
  });

  it('should snapshot successfully', () => {
    const { container } = render(
      <Schedule schedules={MOCK_STUDENT_SCHEDULES} />,
    );

    expect(container).toMatchSnapshot();
  });
});
