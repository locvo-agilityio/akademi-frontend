import type { Meta, StoryObj } from '@storybook/react';

// Components
import Pagination from '.';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  tags: ['autodocs'],
  component: Pagination,
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    totalRecords: '100 items',
    pageSize: 10,
    currentButtons: [1, 2, 3, '...', 7],
    currentPage: 2,
  },
};
