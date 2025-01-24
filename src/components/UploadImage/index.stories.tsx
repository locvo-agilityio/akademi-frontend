import { StoryObj, Meta } from '@storybook/react';

import UploadFile from '.';

const meta = {
  title: 'Components/UploadFile',
  component: UploadFile,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof UploadFile>;

export default meta;

type Story = StoryObj<typeof UploadFile>;

export const Default: Story = {};
