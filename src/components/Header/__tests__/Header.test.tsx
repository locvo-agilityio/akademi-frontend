import { render } from '@testing-library/react';

// Components
import Header from '..';

describe('Header component', () => {
  const mockProps = {
    title: 'Students',
    name: 'John Doe',
    role: 'Admin',
    avatar: 'https://bit.ly/dan-abramov',
  };

  it('Render correctly with default props', () => {
    const { container } = render(<Header {...mockProps} />);
    expect(container).toMatchSnapshot();
  });

  it('Render correctly with dashboard', () => {
    const { getByPlaceholderText } = render(
      <Header isDashboard {...mockProps} />,
    );

    expect(getByPlaceholderText('Search here...')).toBeInTheDocument();
  });
});
