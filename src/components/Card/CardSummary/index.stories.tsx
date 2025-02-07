import { StoryObj, Meta } from '@storybook/react';

import CardSummary from '.';
import {
  CalendarIcon,
  FoodIcon,
  StudentIcon,
  TeacherIcon,
} from '@/components/icons';

const meta = {
  title: 'Components/Cards/CardSummary',
  component: CardSummary,
  parameters: {
    layout: 'centered',
  },

  tags: ['autodocs'],
} satisfies Meta<typeof CardSummary>;

export default meta;

type Story = StoryObj<typeof CardSummary>;

export const Student: Story = {
  args: {
    title: 'Students',
    total: 932,
    bgIcon: 'primary',
    icon: <StudentIcon />,
  },
};

export const Teacher: Story = {
  args: {
    title: 'Teachers',
    total: 754,
    bgIcon: 'secondary',
    icon: <TeacherIcon />,
  },
};

export const Event: Story = {
  args: {
    title: 'Events',
    total: 40,
    bgIcon: 'yellow',
    icon: <CalendarIcon />,
  },
};

export const Food: Story = {
  args: {
    title: 'Foods',
    total: 32,
    bgIcon: 'darkBlue',
    icon: <FoodIcon />,
  },
};
