import { useParams } from 'react-router-dom';

// Components
import { Fallback } from '@/components';

// Hooks
import { useGetTeacher } from '@/hooks';

import { TeacherForm as TeacherFormUI } from '@/ui';

const TeacherForm = () => {
  const { id } = useParams();
  const { teacher, isTeacherLoading } = useGetTeacher(id ?? '');

  return isTeacherLoading && id ? (
    <Fallback />
  ) : (
    <TeacherFormUI defaultValues={teacher?.data} />
  );
};

export default TeacherForm;
