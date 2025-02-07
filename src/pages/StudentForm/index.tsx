import { useParams } from 'react-router-dom';

// Components
import { Fallback } from '@/components';

// Hooks
import { useGetStudent } from '@/hooks';

import { StudentForm as StudentFormUI } from '@/ui';

const StudentForm = () => {
  const { id } = useParams();
  const { student, isStudentLoading } = useGetStudent(id ?? '');

  return isStudentLoading && id ? (
    <Fallback />
  ) : (
    <StudentFormUI defaultValues={student?.data} />
  );
};

export default StudentForm;
