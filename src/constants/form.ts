import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from './file';
import { ERROR_MESSAGES } from './message';
import { REGEX } from './regex';

// Types
import { IParent, IStudent, ITeacher, TField } from '@/types';

export const VALIDATION_RULES = {
  IMAGE: {
    validate: (file: File) => {
      if (file.size > MAX_UPLOAD_SIZE) {
        return ERROR_MESSAGES.MAX_SIZE_IMAGE;
      }

      if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
        return ERROR_MESSAGES.INVALID_FILE_TYPE;
      }
    },
  },
  FIRST_NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('First name'),
    pattern: {
      value: REGEX.UPPERCASE,
      message: ERROR_MESSAGES.INVALID_UPPERCASE_FIRST_LETTER,
    },
  },
  LAST_NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Last name'),
    pattern: {
      value: REGEX.UPPERCASE,
      message: ERROR_MESSAGES.INVALID_UPPERCASE_FIRST_LETTER,
    },
  },
  BIRTH_DATE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Date of birth'),
  },
  CITY: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('City'),
  },
  EMAIL: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Email'),
    pattern: {
      value: REGEX.EMAIL,
      message: ERROR_MESSAGES.INVALID_EMAIL,
    },
  },
  ADDRESS: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Address'),
  },
  PARENT_NAME: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Parent name'),
    pattern: {
      value: REGEX.UPPERCASE,
      message: ERROR_MESSAGES.INVALID_UPPERCASE_FIRST_LETTER,
    },
  },
  PHONE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Phone'),
    pattern: {
      value: REGEX.PHONE_NUMBER,
      message: ERROR_MESSAGES.INVALID_PHONE,
    },
  },
  DEGREE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Degree'),
    pattern: {
      value: REGEX.UPPERCASE,
      message: ERROR_MESSAGES.INVALID_UPPERCASE_FIRST_LETTER,
    },
  },
  UNIVERSITY: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('University'),
    pattern: {
      value: REGEX.UPPERCASE,
      message: ERROR_MESSAGES.INVALID_UPPERCASE_FIRST_LETTER,
    },
  },
  SUBJECT: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Subject'),
    pattern: {
      value: REGEX.UPPERCASE,
      message: ERROR_MESSAGES.INVALID_UPPERCASE_FIRST_LETTER,
    },
  },
  EXPERTISE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Expertise'),
    pattern: {
      value: REGEX.UPPERCASE,
      message: ERROR_MESSAGES.INVALID_UPPERCASE_FIRST_LETTER,
    },
  },
  DESCRIPTION: {
    pattern: {
      value: REGEX.UPPERCASE,
      message: ERROR_MESSAGES.INVALID_UPPERCASE_FIRST_LETTER,
    },
  },
  DATE: {
    required: ERROR_MESSAGES.FIELD_REQUIRED('Date'),
  },
};

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
    placeholder: '(xxx) xxx-xxxx',
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
    ariaLabel: 'degree',
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
    placeholder: '(xxx) xxx-xxxx',
    type: 'text',
    rules: VALIDATION_RULES.PHONE,
    ariaLabel: 'parentPhone',
  },
] as unknown as Array<TField<Pick<IParent, 'lastName' | 'phone'>>>;

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
    placeholder: '(xxx) xxx-xxxx',
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
    ariaLabel: 'email',
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
