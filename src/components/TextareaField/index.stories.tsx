import { StoryObj, Meta } from '@storybook/react';

import TextareaField from '.';

const defaultProps = {
  label: 'Email',
  name: 'email',
  placeholder: 'Email',
  onChange: () => {},
};

const meta = {
  title: 'Components/TextareaField',
  component: TextareaField,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof TextareaField>;

export default meta;

type Story = StoryObj<typeof TextareaField>;

export const Default: Story = {
  args: {
    ...defaultProps,
  },
};

export const HasError: Story = {
  args: {
    ...defaultProps,
    isError: true,
  },
};
