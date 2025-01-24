import { render } from '@testing-library/react';

// Components
import CardSchedule from '../CardSchedule';

describe('CardSchedule component', () => {
  const mockProps = {
    subject: 'Class VII-B',
    lesson: 'World History',
    time: '09.00 - 10.00 AM',
    date: 'March 20, 2021',
  };

  it('should render correctly with default props', () => {
    const { container } = render(<CardSchedule {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('should render correctly with avatar props', () => {
    const { container } = render(
      <CardSchedule {...mockProps} avatar="https://bit.ly/dan-abramov" />,
    );
    expect(container).toMatchSnapshot();
  });
});
