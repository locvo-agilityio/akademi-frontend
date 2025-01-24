import { StoryObj, Meta } from '@storybook/react';
import { Flex, Table } from '@chakra-ui/react';

// Components
import TableRow from '.';

const meta: Meta<typeof TableRow> = {
  title: 'Components/Tables/TableRow',
  tags: ['autodocs'],
  component: TableRow,
  render: (props) => (
    <Flex w="full" h="100vh" alignItems="center" justifyContent="center">
      <Table p={8} w="1140px">
        <TableRow {...props} />
      </Table>
    </Flex>
  ),
};

export default meta;
type Story = StoryObj<typeof TableRow>;

export const Default: Story = {
  args: {
    cells: [
      { key: 'name', content: 'John Doe' },
      { key: 'id', content: '12345' },
      { key: 'date', content: '2022-01-01' },
      { key: 'parentName', content: 'John Doe' },
      { key: 'city', content: 'New York' },
      { key: 'contact', content: '123-456-7890' },
      { key: 'grade', content: 'A' },
      { key: 'action', content: 'Edit' },
    ],
  },
};
