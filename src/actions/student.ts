'use server';
import { QueryFunctionContext } from '@tanstack/react-query';

// Services
import { apiRequest } from '@/services';

// Constants
import {
  API_PATHS,
  DEFAULT_AMOUNT,
  HTTP_METHOD,
  parentKeys,
  QUERY,
  studentKeys,
  studentsQueryKeys,
} from '@/constants';

// Types
import { IStudent, IStudents } from '@/types';

// Mocks
import { MOCK_STUDENT_SCHEDULES } from '@/__mocks__';

export const getUnpaidStudents = async ({
  queryKey: [{ page }],
}: QueryFunctionContext<ReturnType<(typeof studentsQueryKeys)['list']>>) => {
  const url = `${API_PATHS.STUDENTS}?${QUERY.STUDENTS_UNPAID(page)}`;

  return await apiRequest<IStudents>(HTTP_METHOD.GET, url);
};

export const getStudents = async ({
  queryKey: [{ page, filter }],
}: QueryFunctionContext<ReturnType<(typeof studentsQueryKeys)['list']>>) => {
  const search = filter?.search
    ? `&filters[parentName][$contains]=${filter.search}`
    : '';

  const sort = filter?.sort ? `&sort=createdAt:${filter.sort}` : '';

  const url = `${API_PATHS.STUDENTS}?${QUERY.STUDENTS(page)}${search}${sort}`;

  return await apiRequest<IStudents>(HTTP_METHOD.GET, url);
};

export const getStudent = async ({
  queryKey: [{ id }],
}: QueryFunctionContext<ReturnType<(typeof studentsQueryKeys)['detail']>>) => {
  const url = `${API_PATHS.STUDENTS}/${id}`;

  return await apiRequest<{ data: IStudent }>(HTTP_METHOD.GET, url);
};

export const addStudent = async (_: unknown, formData: FormData) => {
  const payload: IStudent = {
    amount: DEFAULT_AMOUNT,
    schedule: MOCK_STUDENT_SCHEDULES,
    parent: Object.fromEntries(
      parentKeys.map((key) => [key, formData.get(`parent.${key}`) as string]),
    ) as unknown as IStudent['parent'],
    ...(Object.fromEntries(
      studentKeys.map((key) => [key, formData.get(key) as string]),
    ) as unknown as IStudent),
  };

  return await apiRequest(HTTP_METHOD.POST, API_PATHS.STUDENTS, {
    data: payload,
  });
};

export const editStudent = async (_: unknown, formData: FormData) => {
  const documentId = formData.get('documentId');
  const url = `${API_PATHS.STUDENTS}/${documentId}`;

  const payload: IStudent = {
    amount: DEFAULT_AMOUNT,
    schedule: MOCK_STUDENT_SCHEDULES,
    parent: Object.fromEntries(
      parentKeys.map((key) => [key, formData.get(`parent.${key}`) as string]),
    ) as unknown as IStudent['parent'],
    ...(Object.fromEntries(
      studentKeys.map((key) => [key, formData.get(key) as string]),
    ) as unknown as IStudent),
  };

  return await apiRequest(HTTP_METHOD.PUT, url, {
    data: payload,
  });
};

export const deleteStudent = async ({ id }: { id: string }) => {
  const url = `${API_PATHS.STUDENTS}/${id}`;

  return await apiRequest(HTTP_METHOD.DELETE, url);
};
