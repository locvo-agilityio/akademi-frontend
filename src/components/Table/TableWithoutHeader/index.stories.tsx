import { StoryObj, Meta } from '@storybook/react';
import { Box, Flex } from '@chakra-ui/react';

// Components
import TableWithoutHeader from '.';

const meta: Meta<typeof TableWithoutHeader> = {
  title: 'Components/Tables/TableWithoutHeader',
  tags: ['autodocs'],
  component: TableWithoutHeader,
  render: (props) => (
    <Flex
      w="full"
      h="100vh"
      bgColor="gray.150"
      alignItems="center"
      justifyContent="center"
    >
      <Box p={8} borderRadius="lg" w="1140px">
        <TableWithoutHeader {...props} />
      </Box>
    </Flex>
  ),
};

export default meta;
type Story = StoryObj<typeof TableWithoutHeader>;

export const Default: Story = {
  args: {
    columns: [
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
    ],
    dataSource: [
      {
        id: '1',
        date: '2 March 2021, 13:45 PM',
        amount: '$100.00',
        status: 'Paid',
      },
    ],
  },
};
