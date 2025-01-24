import { render } from '@testing-library/react';

// Components
import CardSummary from '../CardSummary';

// Icons
import { StudentIcon } from '@/components/icons';

describe('CardSummary component', () => {
  const mockProps = {
    title: 'Students',
    total: 932,
    bgIcon: 'primary',
    icon: <StudentIcon />,
  };

  it('should render correctly with default props', () => {
    const { container } = render(<CardSummary {...mockProps} />);
    expect(container).toMatchSnapshot();
  });
});
