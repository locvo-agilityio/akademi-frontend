import {
  ActivityIcon,
  CalendarIcon,
  ChatIcon,
  FinanceIcon,
  FoodIcon,
  HomeIcon,
  StudentIcon,
  TeacherIcon,
  UserIcon,
} from '@/components/icons';

export const SIDEBAR = [
  {
    name: 'Dashboard',
    destination: '/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Students',
    destination: '/students',
    icon: StudentIcon,
  },
  {
    name: 'Teachers',
    destination: '/teachers',
    icon: TeacherIcon,
  },
  {
    name: 'Event',
    destination: '/event',
    icon: CalendarIcon,
  },
  {
    name: 'Finance',
    destination: '/finance',
    icon: FinanceIcon,
  },
  {
    name: 'Food',
    destination: '/food',
    icon: FoodIcon,
  },
  {
    name: 'User',
    destination: '/user',
    icon: UserIcon,
  },
  {
    name: 'Chat',
    destination: '/chat',
    icon: ChatIcon,
  },
  {
    name: 'Latest Activity',
    destination: '/latest-activity',
    icon: ActivityIcon,
  },
];
