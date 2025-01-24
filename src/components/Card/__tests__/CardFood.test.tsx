import { render } from '@testing-library/react';

// Components
import CardFood from '../CardFood';

describe('CardFood component', () => {
  const mockProps = {
    name: 'Beef Steak with Fried Potato',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  };

  it('should render correctly with default props', () => {
    const { container } = render(<CardFood {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
