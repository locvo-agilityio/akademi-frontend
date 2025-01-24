import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import CardTeacher from '../CardTeacher';

describe('CardTeacher component', () => {
  const mockProps = {
    id: 1,
    documentId: '1',
    name: 'Dimitres Viga',
    email: 'K5K3x@example.com',
    phone: '123-456-7890',
    subject: 'Mathematics',
    address: 'Jakarta, Indonesia',
  };

  it('should render correctly with default props', () => {
    const { container } = render(
      <BrowserRouter>
        <CardTeacher {...mockProps} />
      </BrowserRouter>,
    );
    expect(container).toMatchSnapshot();
  });
});
