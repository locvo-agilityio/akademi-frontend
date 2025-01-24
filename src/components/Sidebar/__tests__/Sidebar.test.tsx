import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import Sidebar from '..';

describe('Sidebar Component', () => {
  it('Match Sidebar component', () => {
    const element = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>,
    );

    expect(element).toMatchSnapshot();
  });
});
