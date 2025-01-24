import { fireEvent, render } from '@testing-library/react';

// Components
import SearchBox from '..';

const mockOnChange = jest.fn();

describe('SearchBox Component', () => {
  it('Match SearchBox component', () => {
    const element = render(<SearchBox onChange={mockOnChange} />);

    expect(element).toMatchSnapshot();
  });

  it('Should call onChange function', () => {
    const { getByPlaceholderText } = render(
      <SearchBox onChange={mockOnChange} />,
    );

    const input = getByPlaceholderText('Search here...') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Hello' } });

    expect(mockOnChange).toHaveBeenCalled();
  });
});
