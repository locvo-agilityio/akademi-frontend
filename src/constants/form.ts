import { ACCEPTED_FILE_TYPES, MAX_UPLOAD_SIZE } from './file';
import { ERROR_MESSAGES } from './message';
import { REGEX } from './regex';

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
