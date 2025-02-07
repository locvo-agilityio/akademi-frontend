// Types
import { IRoute } from '@/types';

// Constants
import { PUBLIC_ROUTERS } from '@/constants';

// Pages
import {
  Dashboard,
  NotFound,
  Student,
  StudentDetail,
  StudentForm,
  Teacher,
  TeacherDetail,
  TeacherForm,
} from '@/pages';

export const DASHBOARD_ROUTES: IRoute[] = [
  {
    path: PUBLIC_ROUTERS.DASHBOARD,
    Component: Dashboard,
    title: 'Dashboard',
  },
];

export const PUBLIC_ROUTES: IRoute[] = [
  {
    path: PUBLIC_ROUTERS.TEACHERS,
    Component: Teacher,
    title: 'Teachers',
  },
  {
    path: PUBLIC_ROUTERS.STUDENTS,
    Component: Student,
    title: 'Students',
  },
  {
    path: PUBLIC_ROUTERS.NOT_FOUND,
    Component: NotFound,
    title: 'Not Found',
  },
  {
    path: PUBLIC_ROUTERS.STUDENT_DETAIL,
    Component: StudentDetail,
    title: 'Student Details',
  },
  {
    path: PUBLIC_ROUTERS.TEACHER_DETAIL,
    Component: TeacherDetail,
    title: 'Teacher Details',
  },
  {
    path: PUBLIC_ROUTERS.STUDENT_ADD,
    Component: StudentForm,
    title: 'Add New Student',
  },
  {
    path: PUBLIC_ROUTERS.TEACHER_ADD,
    Component: TeacherForm,
    title: 'Add New Teacher',
  },
  {
    path: PUBLIC_ROUTERS.STUDENT_EDIT,
    Component: StudentForm,
    title: 'Edit Student',
  },
  {
    path: PUBLIC_ROUTERS.TEACHER_EDIT,
    Component: TeacherForm,
    title: 'Edit Teacher',
  },
];
