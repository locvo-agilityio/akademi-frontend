import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import SecondaryLayout from '../../SecondaryLayout';

describe('MainLayout', () => {
  it('should render successfully', () => {
    const { container } = render(
      <BrowserRouter
        future={{
          v7_startTransition: true,
        }}
      >
        <SecondaryLayout />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
