// Mocks
import {
  MOCK_STUDENT_SCHEDULES,
  MOCK_STUDENTS,
  MOCK_UNPAID_STUDENTS,
} from '@/__mocks__';

// Services
import {
  addStudent,
  deleteStudent,
  editStudent,
  getStudent,
  getStudents,
  getUnpaidStudents,
} from '../student';
import { apiRequest } from '@/services';

// Constants
import {
  API_PATHS,
  DEFAULT_AMOUNT,
  HTTP_METHOD,
  parentKeys,
  QUERY,
  studentKeys,
} from '@/constants';

jest.mock('@/services', () => ({
  apiRequest: jest.fn(),
}));

describe('Student Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    parentKeys.forEach((key) =>
      mockFormData.append(`parent.${key}`, `${key}-value`),
    );
    studentKeys.forEach((key) => mockFormData.append(key, `${key}-value`));
  });

  const mockFormData = new FormData();

  it('handle getUnpaidStudents sends GET request with correctly', async () => {
    (apiRequest as jest.Mock).mockResolvedValue(MOCK_UNPAID_STUDENTS);

    const signal = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    const result = await getUnpaidStudents({
      queryKey: [
        {
          entity: 'list',
          scope: 'students',
          page: 1,
        },
      ],
      signal: signal as unknown as AbortSignal,
      meta: {},
    });

    const expectedUrl = `${API_PATHS.STUDENTS}?${QUERY.STUDENTS_UNPAID(1)}`;
    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.GET, expectedUrl);
    expect(result).toEqual(MOCK_UNPAID_STUDENTS);
  });

  it('handle getStudents sends GET request with correct filters', async () => {
    const filter = {
      search: 'test',
      sort: 'asc',
    };
    const search = `&filters[parentName][$contains]=${filter.search}`;
    const sort = `&sort=createdAt:${filter.sort}`;

    (apiRequest as jest.Mock).mockResolvedValue(MOCK_STUDENTS);

    const signal = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    const result = await getStudents({
      queryKey: [
        {
          filter,
          entity: 'list',
          scope: 'students',
          page: 1,
        },
      ],
      signal: signal as unknown as AbortSignal,
      meta: {},
    });

    const expectedUrl = `${API_PATHS.STUDENTS}?${QUERY.STUDENTS(1)}${search}${sort}`;
    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.GET, expectedUrl);
    expect(result).toEqual(MOCK_STUDENTS);
  });

  it('handle getStudents sends GET request with correct not filters', async () => {
    (apiRequest as jest.Mock).mockResolvedValue(MOCK_STUDENTS);

    const signal = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    const result = await getStudents({
      queryKey: [
        {
          entity: 'list',
          scope: 'students',
          page: 1,
        },
      ],
      signal: signal as unknown as AbortSignal,
      meta: {},
    });

    const expectedUrl = `${API_PATHS.STUDENTS}?${QUERY.STUDENTS(1)}`;
    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.GET, expectedUrl);
    expect(result).toEqual(MOCK_STUDENTS);
  });

  it('handle getStudent sends GET request with correctly', async () => {
    (apiRequest as jest.Mock).mockResolvedValue(MOCK_STUDENTS[0]);

    const signal = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    const result = await getStudent({
      queryKey: [
        {
          entity: 'detail',
          scope: 'students',
          id: '1',
        },
      ],
      signal: signal as unknown as AbortSignal,
      meta: {},
    });

    const expectedUrl = `${API_PATHS.STUDENTS}/${1}`;
    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.GET, expectedUrl);
    expect(result).toEqual(MOCK_STUDENTS[0]);
  });

  it('handle deleteStudent sends DELETE request with correctly', async () => {
    (apiRequest as jest.Mock).mockResolvedValue({});

    const result = await deleteStudent({ id: '1' });

    const expectedUrl = `${API_PATHS.STUDENTS}/${1}`;
    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.DELETE, expectedUrl);
    expect(result).toEqual({});
  });

  it('handle addStudent sends POST request with correctly', async () => {
    (apiRequest as jest.Mock).mockResolvedValue({});

    await addStudent(null, mockFormData);

    const expectedPayload = {
      amount: DEFAULT_AMOUNT,
      schedule: MOCK_STUDENT_SCHEDULES,
      parent: {
        firstName: 'firstName-value',
        lastName: 'lastName-value',
        email: 'email-value',
        phone: 'phone-value',
        address: 'address-value',
      },
      firstName: 'firstName-value',
      lastName: 'lastName-value',
      email: 'email-value',
      phone: 'phone-value',
      parentName: 'parentName-value',
      birthday: 'birthday-value',
      city: 'city-value',
      avatar: 'avatar-value',
      address: 'address-value',
      payment: 'payment-value',
      grade: 'grade-value',
    };

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.POST,
      API_PATHS.STUDENTS,
      { data: expectedPayload },
    );
  });

  it('should fail to add student if apiRequest fails', async () => {
    (apiRequest as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to add student'),
    );

    const formData = new FormData();
    formData.append('name', 'John Doe');

    await expect(addStudent({}, formData)).rejects.toThrow(
      'Failed to add student',
    );
  });

  it('handle editStudent sends PUT request with correctly', async () => {
    mockFormData.append('documentId', '1');
    (apiRequest as jest.Mock).mockResolvedValue({});

    await editStudent(null, mockFormData);

    const expectedPayload = {
      amount: DEFAULT_AMOUNT,
      schedule: MOCK_STUDENT_SCHEDULES,
      parent: {
        firstName: 'firstName-value',
        lastName: 'lastName-value',
        email: 'email-value',
        phone: 'phone-value',
        address: 'address-value',
      },
      firstName: 'firstName-value',
      lastName: 'lastName-value',
      email: 'email-value',
      phone: 'phone-value',
      parentName: 'parentName-value',
      birthday: 'birthday-value',
      city: 'city-value',
      avatar: 'avatar-value',
      address: 'address-value',
      payment: 'payment-value',
      grade: 'grade-value',
    };

    const expectedUrl = `${API_PATHS.STUDENTS}/${1}`;

    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.PUT, expectedUrl, {
      data: expectedPayload,
    });
  });

  it('should fail to edit student if apiRequest fails', async () => {
    (apiRequest as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to edit student'),
    );

    const formData = new FormData();
    formData.append('documentId', '123');
    formData.append('name', 'Jane Doe');

    await expect(editStudent({}, formData)).rejects.toThrow(
      'Failed to edit student',
    );
  });
});
