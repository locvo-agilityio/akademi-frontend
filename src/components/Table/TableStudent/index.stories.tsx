import { StoryObj, Meta } from '@storybook/react';
import { Avatar, Box, Flex, Td, Text } from '@chakra-ui/react';

// Components
import TableStudent from '.';

const meta: Meta<typeof TableStudent> = {
  title: 'Components/Tables/TableStudent',
  tags: ['autodocs'],
  component: TableStudent,
  render: (props) => (
    <Flex
      w="full"
      h="100vh"
      bgColor="gray.150"
      alignItems="center"
      justifyContent="center"
    >
      <Box p={8} borderRadius="lg" w="1140px">
        <TableStudent {...props} />
      </Box>
    </Flex>
  ),
};

export default meta;
type Story = StoryObj<typeof TableStudent>;

export const Default: Story = {
  args: {
    columns: [
      {
        title: 'Name',
        key: 'name',
        renderBody: ({ firstName, lastName, avatar }) => (
          <Td display="flex" p={0} border="none" alignItems="center" gap={4}>
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
    ],
    dataSource: [
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
    ],
  },
};
