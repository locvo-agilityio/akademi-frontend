export const ERROR_MESSAGES = {
  EMPTY_DATA: 'No data available',
  MAX_SIZE_IMAGE: 'Image size must be less than 3MB',
  INVALID_FILE_TYPE: 'File must be a PNG, JPEG, or JPG',
  FIELD_REQUIRED: (fieldName: string) => `${fieldName} is required`,
  INVALID_PHONE: 'Invalid US phone number format',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_MIN_LENGTH: 'Please enter at least 2 characters',
  INVALID_UPPERCASE_FIRST_LETTER: 'The first letter must be uppercase',
  ADD_TEACHER_FAILED: 'Add teacher failed',
  ADD_STUDENT_FAILED: 'Add student failed',
  UPLOAD_IMAGE_FAILED: 'Upload image failed',
  DELETE_STUDENT_FAILED: 'Delete student failed',
  DELETE_TEACHER_FAILED: 'Delete teacher failed',
  EDIT_TEACHER_FAILED: 'Edit teacher failed',
  EDIT_STUDENT_FAILED: 'Edit student failed',
};

export const SUCCESS_MESSAGES = {
  ADD_TEACHER_SUCCESS: 'Add teacher successfully',
  ADD_STUDENT_SUCCESS: 'Add student successfully',
  DELETE_STUDENT_SUCCESS: 'Delete student successfully',
  DELETE_TEACHER_SUCCESS: 'Delete teacher successfully',
  EDIT_TEACHER_SUCCESS: 'Edit teacher successfully',
  EDIT_STUDENT_SUCCESS: 'Edit student successfully',
  UPLOAD_IMAGE_SUCCESS: 'Upload image successfully',
};
