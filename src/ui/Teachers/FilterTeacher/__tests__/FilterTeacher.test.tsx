import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';

// Components
import FilterTeacher from '..';

// Constants
import { FILTER_OPTIONS } from '@/constants';

const mockSetSearchParams = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useSearchParams: () => [
    { get: jest.fn(), delete: jest.fn(), set: jest.fn() },
    mockSetSearchParams,
  ],
}));

const renderWithRouter = () =>
  render(
    <BrowserRouter>
      <FilterTeacher filterOptions={FILTER_OPTIONS} />
    </BrowserRouter>,
  );

describe('FilterTeacher Component', () => {
  it('renders the component with all elements', () => {
    const { getByPlaceholderText, getByRole, getByTitle, getByText } =
      renderWithRouter();

    expect(getByPlaceholderText('Search here...')).toBeInTheDocument();

    const select = getByRole('combobox');
    expect(select).toBeInTheDocument();
    expect(getByText('Descending')).toBeInTheDocument();
    expect(getByText('Ascending')).toBeInTheDocument();

    const button = getByTitle('New Teacher');
    expect(button).toBeInTheDocument();
  });

  it('updates search params on search input change', () => {
    const { getByPlaceholderText } = renderWithRouter();

    const searchBox = getByPlaceholderText('Search here...');
    fireEvent.change(searchBox, { target: { value: 'John' } });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it('updates search params on sort change', () => {
    const { getByRole } = renderWithRouter();

    const select = getByRole('combobox');
    fireEvent.change(select, { target: { value: 'desc' } });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it('removes search param when search input is cleared', () => {
    const { getByPlaceholderText } = renderWithRouter();

    const searchBox = getByPlaceholderText('Search here...');
    fireEvent.change(searchBox, { target: { value: '' } });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });

  it('removes sort param when default value is selected', () => {
    const { getByRole } = renderWithRouter();

    const select = getByRole('combobox');
    fireEvent.change(select, { target: { value: '' } });

    expect(mockSetSearchParams).toHaveBeenCalled();
  });
});
