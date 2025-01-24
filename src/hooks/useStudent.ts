import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Actions
import {
  deleteStudent,
  getStudent,
  getStudents,
  getUnpaidStudents,
} from '@/actions';

// Constants
import { studentsQueryKeys } from '@/constants';

export const useGetUnpaidStudents = ({ page }: { page: number }) => {
  const { data: unpaidStudents, isFetching: isUnpaidStudentsLoading } =
    useQuery({
      queryKey: [...studentsQueryKeys.list({ page })] as const,
      queryFn: getUnpaidStudents,
    });

  return { unpaidStudents, isUnpaidStudentsLoading };
};

export const useGetStudents = ({
  page,
  filter,
}: {
  page: number;
  filter?: Record<string, string>;
}) => {
  const { data: students, isFetching: isStudentsLoading } = useQuery({
    queryKey: [...studentsQueryKeys.list({ page, filter })] as const,
    queryFn: getStudents,
  });

  return { students, isStudentsLoading };
};

export const useGetStudent = (id: string) => {
  const queryClient = useQueryClient();
  const { data: student, isFetching: isStudentLoading } = useQuery({
    queryKey: studentsQueryKeys.detail(id),
    queryFn: getStudent,
    initialData: () => queryClient.getQueryData([studentsQueryKeys.detail(id)]),
  });

  return { student, isStudentLoading };
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: handleDeleteStudent, isPending: isDeleteLoading } =
    useMutation({
      mutationFn: deleteStudent,
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: studentsQueryKeys.lists(),
        }),
    });

  return { handleDeleteStudent, isDeleteLoading };
};
