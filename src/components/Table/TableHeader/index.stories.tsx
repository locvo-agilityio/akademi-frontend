import { StoryObj, Meta } from '@storybook/react';
import { Flex, Table } from '@chakra-ui/react';

// Components
import TableHeader from '.';

const meta: Meta<typeof TableHeader> = {
  title: 'Components/Tables/TableHeader',
  tags: ['autodocs'],
  component: TableHeader,
  render: (props) => (
    <Flex w="full" h="100vh" alignItems="center" justifyContent="center">
      <Table p={8} borderRadius="lg" w="1140px">
        <TableHeader {...props} />
      </Table>
    </Flex>
  ),
};

export default meta;
type Story = StoryObj<typeof TableHeader>;

export const Default: Story = {
  args: {
    columns: [
      {
        title: 'Name',
        key: 'name',
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
  },
};
