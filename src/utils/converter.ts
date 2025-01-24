// Constants
import { VALIDATION_RULES } from '@/constants';

// Types
import {
  IParent,
  IStudent,
  ITeacher,
  PaginationTableType,
  TDataSource,
  TField,
  THeaderTable,
} from '@/types';

export const processTableData = (
  columns: THeaderTable[],
  dataSource: TDataSource[],
) =>
  dataSource.map((data) => ({
    id: data.id,
    cells: columns.map((column) => ({
      key: `${data.id}-${column.key}`,
      content: column.renderBody
        ? column.renderBody(data)
        : data[column.key as keyof typeof data],
    })),
  }));

export const formatAmount = (amount: number) => amount.toLocaleString();

export const formatNumberButton = (numberOfPage: number): number[] =>
  Array.from({ length: numberOfPage }, (_, index) => index + 1);

export const formatPageArray = ({
  totalPage,
  currentPage,
}: PaginationTableType): (string | number)[] => {
  const DOTS = '...';
  const numberOfPage = Math.ceil(totalPage);

  if (numberOfPage === 0) return [1];

  if (numberOfPage <= 4) {
    return formatNumberButton(numberOfPage);
  }

  const isNearStart = currentPage <= 3;
  const isNearEnd = currentPage >= numberOfPage - 2;
  const isInMiddle = !isNearStart && !isNearEnd;

  if (isNearStart) {
    return [1, 2, 3, DOTS, numberOfPage];
  }

  if (isNearEnd) {
    return [1, DOTS, numberOfPage - 2, numberOfPage - 1, numberOfPage];
  }

  if (isInMiddle) {
    return [
      1,
      DOTS,
      currentPage - 1,
      currentPage,
      currentPage + 1,
      DOTS,
      numberOfPage,
    ];
  }

  return [];
};

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const BASIC_STUDENT_INFO = [
  {
    name: 'lastName',
    label: 'Last Name *',
    placeholder: 'Please enter your last name',
    type: 'text',
    rules: VALIDATION_RULES.LAST_NAME,
    ariaLabel: 'lastName',
  },
  {
    name: 'parentName',
    label: 'Parent Name *',
    placeholder: 'Please enter your parent name',
    type: 'text',
    rules: VALIDATION_RULES.PARENT_NAME,
    ariaLabel: 'parentName',
  },
  {
    name: 'phone',
    label: 'Phone *',
    placeholder: 'Please enter your phone',
    type: 'text',
    rules: VALIDATION_RULES.PHONE,
    ariaLabel: 'phone',
  },
] as Array<TField<Pick<IStudent, 'lastName' | 'parentName' | 'phone'>>>;

export const BASIC_TEACHER_INFO = [
  {
    name: 'firstName',
    label: 'First Name *',
    placeholder: 'Please enter your first name',
    type: 'text',
    rules: VALIDATION_RULES.FIRST_NAME,
    ariaLabel: 'firstName',
  },
  {
    name: 'email',
    label: 'Email *',
    placeholder: 'Please enter your email',
    type: 'email',
    rules: VALIDATION_RULES.EMAIL,
    ariaLabel: 'phone',
  },
  {
    name: 'address',
    label: 'Address',
    placeholder: 'Please enter your address',
    type: 'text',
    rules: VALIDATION_RULES.ADDRESS,
    ariaLabel: 'address',
  },
  {
    name: 'birthday',
    label: 'Date of Birth *',
    placeholder: 'Please enter your birthday',
    min: '1970-12-31',
    max: '2000-12-31',
    type: 'date',
    rules: VALIDATION_RULES.BIRTH_DATE,
    ariaLabel: 'birthday',
  },
  {
    name: 'subject',
    label: 'Subject',
    placeholder: 'Please enter your subject',
    type: 'text',
    rules: VALIDATION_RULES.CITY,
    ariaLabel: 'subject',
  },
  {
    name: 'description',
    label: 'Description',
    placeholder: 'Please enter your description',
    type: 'text',
    rules: VALIDATION_RULES.DESCRIPTION,
    ariaLabel: 'description',
  },
] as Array<
  TField<
    Pick<
      ITeacher,
      'firstName' | 'email' | 'address' | 'birthday' | 'subject' | 'description'
    >
  >
>;

export const ADDITIONAL_TEACHER_INFO = [
  {
    name: 'lastName',
    label: 'Last Name *',
    placeholder: 'Please enter your last name',
    type: 'text',
    rules: VALIDATION_RULES.LAST_NAME,
    ariaLabel: 'lastName',
  },
  {
    name: 'phone',
    label: 'Phone *',
    placeholder: 'Please enter your phone',
    type: 'text',
    rules: VALIDATION_RULES.PHONE,
    ariaLabel: 'phone',
  },
] as Array<TField<Pick<ITeacher, 'lastName' | 'phone'>>>;

export const EDUCATION_TEACHER_INFO = [
  {
    name: 'degree',
    label: 'Degree *',
    placeholder: 'Please enter your degree',
    type: 'text',
    rules: VALIDATION_RULES.DEGREE,
    ariaLabel: 'phone',
  },
  {
    name: 'cityEducation',
    label: 'City *',
    placeholder: 'Please enter your city',
    type: 'text',
    rules: VALIDATION_RULES.CITY,
    ariaLabel: 'cityEducation',
  },
] as Array<TField<Pick<ITeacher, 'degree' | 'cityEducation'>>>;

export const BASIC_PARENT_STUDENT_INFO = [
  {
    name: 'parent.firstName',
    label: 'First Name *',
    placeholder: 'Please enter your first name',
    type: 'text',
    rules: VALIDATION_RULES.FIRST_NAME,
    ariaLabel: 'firstName',
  },
  {
    name: 'parent.email',
    label: 'Email *',
    placeholder: 'Please enter your email',
    type: 'email',
    rules: VALIDATION_RULES.EMAIL,
    ariaLabel: 'email',
  },
] as unknown as Array<TField<Pick<IParent, 'firstName' | 'email'>>>;

export const ADDITIONAL_PARENT_STUDENT_INFO = [
  {
    name: 'parent.lastName',
    label: 'Last Name *',
    placeholder: 'Please enter your last name',
    type: 'text',
    rules: VALIDATION_RULES.LAST_NAME,
    ariaLabel: 'lastName',
  },
  {
    name: 'parent.phone',
    label: 'Phone *',
    placeholder: 'Please enter your phone',
    type: 'text',
    rules: VALIDATION_RULES.PHONE,
    ariaLabel: 'parentPhone',
  },
] as unknown as Array<TField<Pick<IParent, 'lastName' | 'phone'>>>;
