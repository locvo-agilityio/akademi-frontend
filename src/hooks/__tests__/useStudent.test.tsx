import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

// Actions
import {
  deleteStudent,
  getStudent,
  getStudents,
  getUnpaidStudents,
} from '@/actions';

// Hooks
import {
  useDeleteStudent,
  useGetStudent,
  useGetStudents,
  useGetUnpaidStudents,
} from '../useStudent';

// Mocks
import { MOCK_STUDENTS, MOCK_UNPAID_STUDENTS } from '@/__mocks__';

const mockFetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({}),
});

global.fetch = mockFetch;

jest.mock('@/actions', () => ({
  getStudents: jest.fn(),
  getUnpaidStudents: jest.fn(),
  deleteStudent: jest.fn(),
  getStudent: jest.fn(),
}));

describe('useStudent', () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return students correctly', async () => {
    (getStudents as jest.Mock).mockResolvedValue(MOCK_STUDENTS);

    const { result } = renderHook(
      () => useGetStudents({ page: 1, filter: {} }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.students).toEqual(MOCK_STUDENTS);
    });
  });

  it('should return unpaid students correctly', async () => {
    (getUnpaidStudents as jest.Mock).mockResolvedValue(MOCK_UNPAID_STUDENTS);

    const { result } = renderHook(() => useGetUnpaidStudents({ page: 1 }), {
      wrapper,
    });

    await waitFor(() => {
      expect(result.current.unpaidStudents).toEqual(MOCK_UNPAID_STUDENTS);
    });
  });

  it('should call handleDeleteStudent function correctly', async () => {
    const mockStudentId = '1';
    (deleteStudent as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useDeleteStudent(), {
      wrapper,
    });

    await result.current.handleDeleteStudent({
      id: mockStudentId,
    });

    await waitFor(() => {
      expect(deleteStudent).toHaveBeenCalledWith({
        id: mockStudentId,
      });
    });
  });

  it('should fetch student detail using the provided id', async () => {
    (getStudent as jest.Mock).mockResolvedValue(MOCK_STUDENTS[0]);

    const { result } = renderHook(
      () => useGetStudent(MOCK_STUDENTS[0].id as unknown as string),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(!result.current.isStudentLoading).toEqual(true);
      expect(result.current.isStudentLoading).toBe(false);
      expect(result.current.student).toEqual(MOCK_STUDENTS[0]);
    });

    expect(getStudent).toHaveBeenCalled();
  });
});
