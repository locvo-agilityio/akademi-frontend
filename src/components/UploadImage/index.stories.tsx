import { StoryObj, Meta } from '@storybook/react';

import UploadFile from '.';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

const meta = {
  title: 'Components/UploadFile',
  component: UploadFile,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={client}>
        <Story />
      </QueryClientProvider>
    ),
  ],

  tags: ['autodocs'],
} satisfies Meta<typeof UploadFile>;

export default meta;

type Story = StoryObj<typeof UploadFile>;

export const Default: Story = {
  args: {
    onFileChange: () => {},
  },
};
