import {
  CalendarIcon,
  FoodIcon,
  StudentIcon,
  TeacherIcon,
} from '@/components/icons';

export const MOCK_SUMMARY_DASHBOARD = [
  {
    title: 'Students',
    total: 932,
    bgIcon: 'primary',
    icon: StudentIcon,
  },
  {
    title: 'Teachers',
    total: 754,
    bgIcon: 'secondary',
    icon: TeacherIcon,
  },
  {
    title: 'Events',
    total: 40,
    bgIcon: 'yellow',
    icon: CalendarIcon,
  },
  {
    title: 'Foods',
    total: 32,
    bgIcon: 'darkBlue',
    icon: FoodIcon,
  },
];
