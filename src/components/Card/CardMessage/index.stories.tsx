import { StoryObj, Meta } from '@storybook/react';

import CardMessage from '.';
import { Box } from '@chakra-ui/react';

const meta = {
  title: 'Components/Cards/CardMessage',
  component: CardMessage,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => (
    <Box w="400px">
      <CardMessage {...args} />
    </Box>
  ),
} satisfies Meta<typeof CardMessage>;

export default meta;

type Story = StoryObj<typeof CardMessage>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    avatar: 'https://bit.ly/dan-abramov',
    time: '10:00',
  },
};
