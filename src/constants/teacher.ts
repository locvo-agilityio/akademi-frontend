import { LocationIcon, MailIcon, PhoneIcon } from '@/components/icons';

export const TEACHER_CONTACT = (
  address: string,
  phone: string,
  email: string,
) => [
  {
    id: 1,
    title: address,
    icon: LocationIcon,
  },
  {
    id: 2,
    title: phone,
    icon: PhoneIcon,
  },
  {
    id: 3,
    title: email,
    icon: MailIcon,
  },
];

export const teacherKeys = [
  'firstName',
  'lastName',
  'phone',
  'email',
  'address',
  'city',
  'birthday',
  'cityEducation',
  'degree',
  'description',
  'endEducation',
  'expertise',
  'photo',
  'startEducation',
  'subject',
  'university',
];
