import { render } from '@testing-library/react';

// Components
import CustomToast from '..';

// Constants
import { TOAST_STATUS } from '@/constants';

describe('CustomToast Component', () => {
  it('should render message error correctly', () => {
    const { getByText } = render(
      <CustomToast status={TOAST_STATUS.ERROR} message="error message" />,
    );
    expect(getByText('error message')).toBeInTheDocument();
  });

  it('should render message success correctly', () => {
    const { getByText } = render(
      <CustomToast status={TOAST_STATUS.SUCCESS} message="success message" />,
    );
    expect(getByText('success message')).toBeInTheDocument();
  });
});
