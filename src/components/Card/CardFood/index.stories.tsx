import { StoryObj, Meta } from '@storybook/react';

import CardFood from '.';
import { Box } from '@chakra-ui/react';

const meta = {
  title: 'Components/Cards/CardFood',
  component: CardFood,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
  render: (args) => (
    <Box w="312px">
      <CardFood {...args} />
    </Box>
  ),
} satisfies Meta<typeof CardFood>;

export default meta;

type Story = StoryObj<typeof CardFood>;

export const Default: Story = {
  args: {
    name: 'Beef Steak with Fried Potato',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    image: 'https://bit.ly/dan-abramov',
  },
};
