import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

// Actions
import { deleteTeacher, getTeachers, getTeacher } from '@/actions';

// Hooks
import { useDeleteTeacher, useGetTeacher, useGetTeachers } from '../useTeacher';

// Mocks
import { MOCK_TEACHERS } from '@/__mocks__';

const mockFetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({}),
});

global.fetch = mockFetch;

jest.mock('@/actions', () => ({
  getTeachers: jest.fn(),
  deleteTeacher: jest.fn(),
  getTeacher: jest.fn(),
}));

describe('useTeacher', () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return teachers correctly', async () => {
    (getTeachers as jest.Mock).mockResolvedValue(MOCK_TEACHERS);

    const { result } = renderHook(
      () => useGetTeachers({ page: 1, filter: {} }),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(result.current.teachers).toEqual(MOCK_TEACHERS);
    });
  });

  it('should call handleDeleteTeacher function correctly', async () => {
    const mockTeacherId = '1';
    (deleteTeacher as jest.Mock).mockResolvedValue({});

    const { result } = renderHook(() => useDeleteTeacher(), {
      wrapper,
    });

    await result.current.handleDeleteTeacher({
      id: mockTeacherId,
    });

    await waitFor(() => {
      expect(deleteTeacher).toHaveBeenCalledWith({
        id: mockTeacherId,
      });
    });
  });

  it('should fetch teacher detail using the provided id', async () => {
    (getTeacher as jest.Mock).mockResolvedValue(MOCK_TEACHERS[0]);

    const { result } = renderHook(
      () => useGetTeacher(MOCK_TEACHERS[0].id as unknown as string),
      {
        wrapper,
      },
    );

    await waitFor(() => {
      expect(!result.current.isTeacherLoading).toEqual(true);
      expect(result.current.isTeacherLoading).toBe(false);
      expect(result.current.teacher).toEqual(MOCK_TEACHERS[0]);
    });

    expect(getTeacher).toHaveBeenCalled();
  });
});
