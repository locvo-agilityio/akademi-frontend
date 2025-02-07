import { formatDate } from '@/utils';

export const MOCK_STUDENT_SCHEDULES = [
  {
    id: 1,
    subject: 'Algorithm',
    lesson: 'Basic Algorithm',
    time: '07.00 - 09.00 AM',
    date: formatDate(String(new Date())),
    avatar: 'https://bit.ly/dan-abramov',
    colorLesson: 'primary',
  },
  {
    id: 2,
    subject: 'Art',
    lesson: 'Basic Art',
    time: '09.00 - 11.00 AM',
    date: formatDate(String(new Date())),
    avatar: 'https://bit.ly/dan-abramov',
    colorLesson: 'secondary',
  },
  {
    id: 3,
    subject: 'English',
    lesson: 'Simple Past Tense',
    time: '13.00 - 15.00 PM',
    date: formatDate(String(new Date())),
    avatar: 'https://bit.ly/dan-abramov',
    colorLesson: 'yellow',
  },
  {
    id: 4,
    subject: 'Class VII-B',
    lesson: 'World History',
    time: '15.00 - 17.00 PM',
    date: formatDate(String(new Date())),
    avatar: 'https://bit.ly/dan-abramov',
    colorLesson: 'darkBlue',
  },
];

export const MOCK_TEACHER_SCHEDULES = [
  {
    id: 1,
    subject: 'Class VII-B',
    lesson: 'World History',
    time: '07.00 - 09.00 AM',
    date: formatDate(String(new Date())),
    colorLesson: 'primary',
  },
  {
    id: 2,
    subject: 'Class VII-A',
    lesson: 'Ancient History',
    time: '09.00 - 11.00 AM',
    date: formatDate(String(new Date())),
    colorLesson: 'secondary',
  },
  {
    id: 3,
    subject: 'Class VII-A',
    lesson: 'Culture',
    time: '13.00 - 15.00 PM',
    date: formatDate(String(new Date())),
    colorLesson: 'yellow',
  },
  {
    id: 4,
    subject: 'Class VII-B',
    lesson: 'World History',
    time: '15.00 - 17.00 PM',
    date: formatDate(String(new Date())),
    colorLesson: 'darkBlue',
  },
];
