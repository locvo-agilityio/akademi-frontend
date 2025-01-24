import { render } from '@testing-library/react';

// Components
import MenuHeader from '..';

describe('MenuHeader component', () => {
  const mockProps = {
    name: 'John Doe',
    role: 'Admin',
  };

  it('Render correctly with default props', () => {
    const { container } = render(<MenuHeader {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
