import { lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';

// Components
import { Fallback } from '@/components';

// Hooks
import { useGetTeacher } from '@/hooks';

const TeacherFormUI = lazy(() => import('@/ui/TeacherForm'));

const TeacherForm = () => {
  const { id } = useParams();
  const { teacher, isTeacherLoading } = useGetTeacher(id ?? '');

  return (
    <Suspense fallback={<Fallback />}>
      {!isTeacherLoading && <TeacherFormUI defaultValues={teacher?.data} />}
    </Suspense>
  );
};

export default TeacherForm;
