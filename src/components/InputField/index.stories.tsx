import { StoryObj, Meta } from '@storybook/react';

import InputField from '.';

const defaultProps = {
  label: 'Email',
  name: 'email',
  placeholder: 'Email',
  onChange: () => {},
};

const meta = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof InputField>;

export default meta;

type Story = StoryObj<typeof InputField>;

export const Default: Story = {
  args: {
    type: 'password',
    ...defaultProps,
  },
};

export const HasError: Story = {
  args: {
    ...defaultProps,
    isError: true,
  },
};
