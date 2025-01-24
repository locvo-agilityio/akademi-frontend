import { StoryObj, Meta } from '@storybook/react';

import Header from '.';
import { Box } from '@chakra-ui/react';

const defaultProps = {
  title: 'Students',
  name: 'John Doe',
  role: 'Admin',
  avatar: 'https://bit.ly/dan-abramov',
};

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],

  render: (args) => (
    <Box w={900}>
      <Header {...args} />
    </Box>
  ),
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const Dashboard: Story = {
  args: {
    ...defaultProps,
    isDashboard: true,
  },
};
