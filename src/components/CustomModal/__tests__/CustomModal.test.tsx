import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import CustomModal from '..';

describe('CustomModal test cases', () => {
  const mockOnClose = jest.fn();

  const mockRenderBody = <></>;

  const setup = () =>
    render(
      <CustomModal
        isOpen={true}
        onClose={mockOnClose}
        body={mockRenderBody}
        title="mock title"
      />,
    );

  it('should render correctly', () => {
    const { container } = setup();

    expect(container).toMatchSnapshot();
  });

  it('should render with default value', () => {
    const { container } = render(
      <CustomModal isOpen={true} onClose={mockOnClose} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should close CustomModal when close button is clicked', async () => {
    render(
      <CustomModal isOpen={true} onClose={mockOnClose} hasCloseButton={true} />,
    );
    await userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(mockOnClose).toHaveBeenCalled());
  });
});
