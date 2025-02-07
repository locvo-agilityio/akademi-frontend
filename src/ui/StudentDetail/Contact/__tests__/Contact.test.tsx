import { render } from '@testing-library/react';

import Contact from '..';

describe('Contact', () => {
  it('should render successfully', () => {
    const { container } = render(
      <Contact
        address="Jakarta"
        email="john.doe@example.com"
        phone="08123456789"
        parentName="John Doe"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
