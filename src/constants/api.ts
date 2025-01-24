import { TQueryKey } from '@/types';

export const API_PATHS = {
  TEACHERS: '/teachers',
  STUDENTS: '/students',
};

export const studentsQueryKeys = {
  all: [{ scope: 'students' }] as const,
  lists: () => [{ ...studentsQueryKeys.all[0], entity: 'list' }] as const,
  list: ({ page, filter }: TQueryKey) =>
    [
      {
        ...studentsQueryKeys.lists()[0],
        page,
        ...(filter && { filter }),
      },
    ] as const,
  details: () => [{ ...studentsQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) => [{ ...studentsQueryKeys.details()[0], id }] as const,
};

export const teachersQueryKeys = {
  all: [{ scope: 'teachers' }] as const,
  lists: () => [{ ...teachersQueryKeys.all[0], entity: 'list' }] as const,
  list: ({ page, filter }: TQueryKey) =>
    [
      {
        ...teachersQueryKeys.lists()[0],
        page,
        ...(filter && { filter }),
      },
    ] as const,
  details: () => [{ ...teachersQueryKeys.all[0], entity: 'detail' }] as const,
  detail: (id?: string) => [{ ...teachersQueryKeys.details()[0], id }] as const,
};
