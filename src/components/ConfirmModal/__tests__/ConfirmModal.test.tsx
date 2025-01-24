import { render, fireEvent } from '@testing-library/react';

// Components
import ConfirmModal from '..';

describe('ConfirmModal', () => {
  const onConfirmMock = jest.fn();
  const onCloseModalMock = jest.fn();

  const renderComponent = (props = {}) =>
    render(
      <ConfirmModal
        title="Confirm Action"
        itemName="Test Item"
        isLoading={false}
        isDisabled={false}
        onConfirm={onConfirmMock}
        onCloseModal={onCloseModalMock}
        {...props}
      />,
    );

  it('renders correctly with given props', () => {
    const { getByText } = renderComponent();

    expect(getByText('Confirm Action')).toBeInTheDocument();
    expect(getByText('Test Item')).toBeInTheDocument();
    expect(getByText('Cancel')).toBeInTheDocument();
    expect(getByText('Confirm')).toBeInTheDocument();
  });

  it('calls onCloseModal when the Cancel button is clicked', () => {
    const { getByRole } = renderComponent();

    fireEvent.click(getByRole('button', { name: 'Cancel' }));

    expect(onCloseModalMock).toHaveBeenCalledTimes(1);
  });

  it('calls onConfirm when the Confirm button is clicked', () => {
    const { getByRole } = renderComponent();

    fireEvent.click(getByRole('button', { name: 'Confirm' }));

    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it('disables Confirm button when isDisabled is true', () => {
    const { getByText } = renderComponent({ isDisabled: true });

    expect(getByText('Confirm').closest('button')).toBeDisabled();
  });

  it('should render default value correctly', () => {
    const { container } = render(<ConfirmModal />);
    expect(container).toBeInTheDocument();
  });
});
