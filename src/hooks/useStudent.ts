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
import { IStudent, IStudents } from '@/types';

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

  const cachedStudents = queryClient.getQueriesData({
    queryKey: studentsQueryKeys.lists(),
  });

  const allStudents = cachedStudents.flatMap(([_, data]) => data ?? []);

  const initialStudents = (allStudents[0] as IStudents)?.data.find(
    (student) => student.documentId === id,
  );

  const { data: student, isFetching: isStudentLoading } = useQuery({
    queryKey: studentsQueryKeys.detail(id),
    queryFn: getStudent,
    enabled: !!id,
    placeholderData: { data: initialStudents as IStudent },
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
