'use server';

import { QueryFunctionContext } from '@tanstack/react-query';

// Constants
import {
  API_PATHS,
  HTTP_METHOD,
  QUERY,
  teacherKeys,
  teachersQueryKeys,
} from '@/constants';

// Services
import { apiRequest } from '@/services';

// Types
import { ITeacher, ITeachers } from '@/types';

// Mocks
import { MOCK_TEACHER_SCHEDULES } from '@/__mocks__';

export const getTeachers = async ({
  queryKey: [{ page, filter }],
}: QueryFunctionContext<ReturnType<(typeof teachersQueryKeys)['list']>>) => {
  const search = filter?.search
    ? `&filters[email][$contains]=${filter.search}`
    : '';

  const sort = filter?.sort ? `&sort=createdAt:${filter.sort}` : '';

  const url = `${API_PATHS.TEACHERS}?${QUERY.TEACHERS(page)}${search}${sort}`;

  return await apiRequest<ITeachers>(HTTP_METHOD.GET, url);
};

export const getTeacher = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<ReturnType<(typeof teachersQueryKeys)['detail']>>) => {
  const url = `${API_PATHS.TEACHERS}/${id}`;

  return await apiRequest<{ data: ITeacher }>(HTTP_METHOD.GET, url);
};

export const addTeacher = async (_: unknown, formData: FormData) => {
  const payload: ITeacher = {
    ...(Object.fromEntries(
      teacherKeys.map((key) => [key, formData.get(key) as string]),
    ) as unknown as ITeacher),
    schedule: MOCK_TEACHER_SCHEDULES,
  };

  return await apiRequest(HTTP_METHOD.POST, API_PATHS.TEACHERS, {
    data: payload,
  });
};

export const editTeacher = async (_: unknown, formData: FormData) => {
  const documentId = formData.get('documentId');
  const url = `${API_PATHS.TEACHERS}/${documentId}`;

  const payload: ITeacher = {
    ...(Object.fromEntries(
      teacherKeys.map((key) => [key, formData.get(key) as string]),
    ) as unknown as ITeacher),
    schedule: MOCK_TEACHER_SCHEDULES,
  };

  return await apiRequest(HTTP_METHOD.PUT, url, {
    data: payload,
  });
};

export const deleteTeacher = async ({ id }: { id: string }) => {
  const url = `${API_PATHS.TEACHERS}/${id}`;

  return await apiRequest(HTTP_METHOD.DELETE, url);
};
