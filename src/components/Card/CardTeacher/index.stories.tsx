import { StoryObj, Meta } from '@storybook/react';

import CardTeacher from '.';

const meta = {
  title: 'Components/Cards/CardTeacher',
  component: CardTeacher,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof CardTeacher>;

export default meta;

type Story = StoryObj<typeof CardTeacher>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    subject: 'Math Teacher',
    avatar: 'https://bit.ly/dan-abramov',
    phone: '123-456-7890',
    email: 'K5K3x@example.com',
  },
};
