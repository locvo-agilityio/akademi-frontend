import { render } from '@testing-library/react';

import NotFound from '..';

describe('NotFound', () => {
  it('should render successfully', () => {
    const { container } = render(<NotFound />);

    expect(container).toMatchSnapshot();
  });
});
