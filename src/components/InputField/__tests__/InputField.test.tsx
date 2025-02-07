import { fireEvent, render } from '@testing-library/react';

// Components
import InputField from '..';

describe('InputField component', () => {
  const mockOnChange = jest.fn();
  const props = {
    label: 'Email',
    name: 'email',
    placeholder: 'Email',
    onChange: mockOnChange,
  };
  it('Render correctly with default props', () => {
    const { container } = render(<InputField {...props} />);
    expect(container).toMatchSnapshot();
  });

  it('Render correctly with error message', () => {
    const { getByText } = render(
      <InputField {...props} isError errorMessages="Field is required" />,
    );
    expect(getByText('Field is required')).toBeInTheDocument();
  });

  it('should call onChange when input value is changed', async () => {
    const { getByPlaceholderText } = render(<InputField {...props} />);
    fireEvent.change(getByPlaceholderText('Email'), {
      target: { value: 'user@gmail.com' },
    });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
