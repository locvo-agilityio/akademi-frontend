import { render } from '@testing-library/react';

// Components
import CardMessage from '../CardMessage';

describe('CardMessage component', () => {
  const mockProps = {
    name: 'John Doe',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    time: '10:00',
  };

  it('should render correctly with default props', () => {
    const { container } = render(<CardMessage {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
