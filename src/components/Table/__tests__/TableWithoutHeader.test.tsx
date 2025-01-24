import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// Components
import TableWithoutHeader from '../TableWithoutHeader';
import { ERROR_MESSAGES } from '@/constants';

describe('TableWithoutHeader Component', () => {
  const renderSetup = () =>
    render(
      <BrowserRouter>
        <TableWithoutHeader
          columns={[
            {
              title: 'ID',
              key: 'id',
            },
            {
              title: 'Date',
              key: 'date',
            },
            {
              title: 'Amount',
              key: 'amount',
            },
            {
              title: 'Status',
              key: 'status',
            },
          ]}
          dataSource={[
            {
              id: '1',
              date: '2 March 2021, 13:45 PM',
              amount: '$100.00',
              status: 'Paid',
            },
          ]}
        />
      </BrowserRouter>,
    );

  it('Should match snapshot', () => {
    const { container } = renderSetup();
    expect(container).toMatchSnapshot();
  });

  it('should render empty data', () => {
    const { getByText } = render(
      <BrowserRouter>
        <TableWithoutHeader />
      </BrowserRouter>,
    );

    expect(getByText(ERROR_MESSAGES.EMPTY_DATA)).toBeInTheDocument();
  });
});
