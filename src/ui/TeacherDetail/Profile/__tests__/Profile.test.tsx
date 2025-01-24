import { render } from '@testing-library/react';

import Profile from '..';

describe('Profile Teacher', () => {
  it('should render default value successfully', () => {
    const { container } = render(<Profile />);

    expect(container).toMatchSnapshot();
  });

  it('should render value successfully', () => {
    const { container } = render(
      <Profile
        address="Jakarta"
        email="john.doe@example.com"
        phone="08123456789"
        subject="Math"
        avatar="https://example.com/avatar.jpg"
        name="John Doe"
        degree="Bachelor of Science"
        university="University of Example"
        expertise="Mathematics"
        startEducation="2015"
        endEducation="2020"
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
