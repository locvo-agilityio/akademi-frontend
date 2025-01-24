import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

// Components
import { Fallback } from '@/components';

// Hooks
import { useGetStudent } from '@/hooks';

const StudentFormUI = lazy(() => import('@/ui/StudentForm/'));

const StudentForm = () => {
  const { id } = useParams();
  const { student, isStudentLoading } = useGetStudent(id ?? '');

  return (
    <Suspense fallback={<Fallback />}>
      {!isStudentLoading && <StudentFormUI defaultValues={student?.data} />}
    </Suspense>
  );
};

export default StudentForm;
