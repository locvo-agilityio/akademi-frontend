import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Constants
import { teachersQueryKeys } from '@/constants';

// Actions
import { deleteTeacher, getTeacher, getTeachers } from '@/actions';

export const useGetTeachers = ({
  page,
  filter,
}: {
  page: number;
  filter?: Record<string, string>;
}) => {
  const { data: teachers, isFetching: isTeachersLoading } = useQuery({
    queryKey: [...teachersQueryKeys.list({ page, filter })] as const,
    queryFn: getTeachers,
  });

  return { teachers, isTeachersLoading };
};

export const useGetTeacher = (id: string) => {
  const { data: teacher, isFetching: isTeacherLoading } = useQuery({
    queryKey: teachersQueryKeys.detail(id),
    queryFn: getTeacher,
    enabled: !!id,
  });

  return { teacher, isTeacherLoading };
};

export const useDeleteTeacher = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteTeacher, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: deleteTeacher,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: teachersQueryKeys.lists(),
        }),
    });

  return { handleDeleteTeacher, isDeleteLoading };
};
