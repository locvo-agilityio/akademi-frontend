import { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react';

// Actions
import { deleteTeacher, getTeachers, getTeacher } from '@/actions';

// Hooks
import { useDeleteTeacher, useGetTeacher, useGetTeachers } from '../useTeacher';

// Mocks
import { MOCK_TEACHERS } from '@/__mocks__';

// Constants
import { teachersQueryKeys } from '@/constants';

const mockFetch = jest.fn().mockResolvedValue({
  json: jest.fn().mockResolvedValue({}),
});

global.fetch = mockFetch;

jest.mock('@/actions', () => ({
  getTeachers: jest.fn(),
  deleteTeacher: jest.fn(),
  getTeacher: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  ...jest.requireActual('@tanstack/react-query'),
  useQueryClient: jest.fn(),
}));

const mockQueryClient = {
  getQueriesData: jest.fn(),
  invalidateQueries: jest.fn(),
};

describe('useTeacher', () => {
  const queryClient = new QueryClient();

  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  beforeEach(() => {
    (useQueryClient as jest.Mock).mockReturnValue(mockQueryClient);
  });

  afterEach(() => {
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
    mockQueryClient.getQueriesData.mockReturnValue([
      [
        teachersQueryKeys.lists(),
        {
          data: MOCK_TEACHERS,
        },
      ],
    ]);

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
