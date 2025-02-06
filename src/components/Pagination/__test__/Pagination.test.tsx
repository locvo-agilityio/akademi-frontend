import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Components
import Pagination from '..';

const onPageChangeMock = jest.fn();
const onClickPageMock = jest.fn();

describe('Pagination render', () => {
  it('Should match snapshot.', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        isDisableNext={true}
        isDisabledPrev={true}
        currentButtons={[1, 2, 3, '...', 4]}
        onClickPage={onClickPageMock}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Handle click page', async () => {
    const { getByTitle } = render(
      <Pagination onPageChange={onPageChangeMock} />,
    );

    const nextPage = getByTitle('next-button');

    await userEvent.click(nextPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it('Handle next page', async () => {
    const { getByTitle } = render(
      <Pagination onPageChange={onPageChangeMock} />,
    );

    const nextPage = getByTitle('next-button');

    await userEvent.click(nextPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it('Handle click number page', async () => {
    const { getByTitle } = render(
      <Pagination
        currentPage={1}
        isDisableNext={true}
        isDisabledPrev={true}
        currentButtons={[1, 2, 3, '...', 4]}
        onClickPage={onClickPageMock}
      />,
    );

    const nextPage = getByTitle('page-2');

    await userEvent.click(nextPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it('Handle prev page', async () => {
    const { getByTitle } = render(
      <Pagination currentPage={2} onPageChange={onPageChangeMock} />,
    );

    const nextPage = getByTitle('prev-button');

    await userEvent.click(nextPage);
    expect(onPageChangeMock).toHaveBeenCalled();
  });

  it('should render default value correctly', () => {
    const { container } = render(<Pagination />);

    expect(container).toBeInTheDocument();
  });
});
