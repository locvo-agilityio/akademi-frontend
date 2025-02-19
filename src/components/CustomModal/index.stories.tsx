import { Meta, StoryObj } from '@storybook/react';
import { Text } from '@chakra-ui/react';

// Components
import CustomModal from '.';

const meta: Meta<typeof CustomModal> = {
  title: 'Components/CustomModal',
  component: CustomModal,
};

export default meta;

type Story = StoryObj<typeof CustomModal>;

export const Primary: Story = {
  args: {
    title: 'Title',
    isOpen: true,
    body: <Text>Sample Modal</Text>,
  },
};
