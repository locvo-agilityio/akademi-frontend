import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import MainLayout from '..';

describe('MainLayout', () => {
  it('should render successfully', () => {
    const { container } = render(
      <BrowserRouter
        future={{
          v7_startTransition: true,
        }}
      >
        <MainLayout />
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });
});
