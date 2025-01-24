import { StoryObj, Meta } from '@storybook/react';
import { Box } from '@chakra-ui/react';

import CardSchedule from '.';

const meta = {
  title: 'Components/Cards/CardSchedule',
  component: CardSchedule,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => (
    <Box w="400px">
      <CardSchedule {...args} />
    </Box>
  ),
} satisfies Meta<typeof CardSchedule>;

export default meta;

type Story = StoryObj<typeof CardSchedule>;

export const Default: Story = {
  args: {
    subject: 'Class VII-B',
    lesson: 'World History',
    time: '09.00 - 10.00 AM',
    date: 'March 20, 2021',
    avatar: 'https://bit.ly/dan-abramov',
  },
};
