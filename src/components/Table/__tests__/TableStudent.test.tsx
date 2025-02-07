import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Avatar, Td, Text } from '@chakra-ui/react';

// Components
import TableStudent from '../TableStudent';
import { ERROR_MESSAGES } from '@/constants';

describe('TableStudent Component', () => {
  const renderSetup = () =>
    render(
      <BrowserRouter>
        <TableStudent
          columns={[
            {
              title: 'Name',
              key: 'name',
              renderBody: ({ firstName, lastName, avatar }) => (
                <Td
                  display="flex"
                  p={0}
                  border="none"
                  alignItems="center"
                  gap={4}
                >
                  <Avatar
                    size="md"
                    name={`${firstName} ${lastName}`}
                    src={avatar as string}
                  />
                  <Text fontWeight="bold" color="darkBlue">
                    {firstName} {lastName}
                  </Text>
                </Td>
              ),
            },
            {
              title: 'ID',
              key: 'id',
            },
            {
              title: 'Date',
              key: 'date',
            },
            {
              title: 'Parent Name',
              key: 'parentName',
            },
            {
              title: 'City',
              key: 'city',
            },
            {
              title: 'Contact',
              key: 'contact',
            },
            {
              title: 'Grade',
              key: 'grade',
            },
            {
              title: 'Action',
              key: 'action',
            },
          ]}
          dataSource={[
            {
              id: '1',
              avatar: 'https://bit.ly/dan-abramov',
              firstName: 'John',
              lastName: 'Doe',
              date: '2022-01-01',
              parentName: 'John Doe',
              city: 'New York',
              contact: '1234567890',
              grade: 'A',
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
        <TableStudent />
      </BrowserRouter>,
    );

    expect(getByText(ERROR_MESSAGES.EMPTY_DATA)).toBeInTheDocument();
  });
});
