import { render } from '@testing-library/react';

import Profile from '..';

describe('Profile', () => {
  it('should snapshot default value', () => {
    const { container } = render(<Profile />);

    expect(container).toBeInTheDocument();
  });

  it('should snapshot successfully', () => {
    const { container } = render(
      <Profile
        address="Jakarta"
        email="john.doe@example.com"
        phone="08123456789"
        parentName="John Doe"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
