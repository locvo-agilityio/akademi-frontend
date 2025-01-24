// Constants
import { API_PATHS, HTTP_METHOD, QUERY, teacherKeys } from '@/constants';

// Mocks
import { MOCK_TEACHER_SCHEDULES, MOCK_TEACHERS } from '@/__mocks__';

// Services
import { apiRequest } from '@/services';
import {
  addTeacher,
  deleteTeacher,
  editTeacher,
  getTeacher,
  getTeachers,
} from '../teacher';

jest.mock('@/services', () => ({
  apiRequest: jest.fn(),
}));

describe('Teacher Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    teacherKeys.forEach((key) => mockFormData.append(key, `${key}-value`));
  });

  const mockFormData = new FormData();

  it('handle getTeachers sends GET request with correct filters', async () => {
    const filter = {
      search: 'test',
      sort: 'asc',
    };
    const search = `&filters[email][$contains]=${filter.search}`;
    const sort = `&sort=createdAt:${filter.sort}`;

    (apiRequest as jest.Mock).mockResolvedValue(MOCK_TEACHERS);

    const signal = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    const result = await getTeachers({
      queryKey: [
        {
          filter,
          entity: 'list',
          scope: 'teachers',
          page: 1,
        },
      ],
      signal: signal as unknown as AbortSignal,
      meta: {},
    });

    const expectedUrl = `${API_PATHS.TEACHERS}?${QUERY.TEACHERS(1)}${search}${sort}`;
    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.GET, expectedUrl);
    expect(result).toEqual(MOCK_TEACHERS);
  });

  it('handle getTeachers sends GET request with correct not filters', async () => {
    (apiRequest as jest.Mock).mockResolvedValue(MOCK_TEACHERS);

    const signal = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    const result = await getTeachers({
      queryKey: [
        {
          entity: 'list',
          scope: 'teachers',
          page: 1,
        },
      ],
      signal: signal as unknown as AbortSignal,
      meta: {},
    });

    const expectedUrl = `${API_PATHS.TEACHERS}?${QUERY.TEACHERS(1)}`;
    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.GET, expectedUrl);
    expect(result).toEqual(MOCK_TEACHERS);
  });

  it('handle getTeacher sends GET request with correctly', async () => {
    (apiRequest as jest.Mock).mockResolvedValue(MOCK_TEACHERS[0]);

    const signal = {
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };

    const result = await getTeacher({
      queryKey: [
        {
          entity: 'detail',
          scope: 'teachers',
          id: '1',
        },
      ],
      signal: signal as unknown as AbortSignal,
      meta: {},
    });

    const expectedUrl = `${API_PATHS.TEACHERS}/${1}`;
    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.GET, expectedUrl);
    expect(result).toEqual(MOCK_TEACHERS[0]);
  });

  it('handle deleteTeacher sends DELETE request with correctly', async () => {
    (apiRequest as jest.Mock).mockResolvedValue({});

    const result = await deleteTeacher({ id: '1' });

    const expectedUrl = `${API_PATHS.TEACHERS}/${1}`;
    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.DELETE, expectedUrl);
    expect(result).toEqual({});
  });

  it('handle addTeacher sends POST request with correctly', async () => {
    (apiRequest as jest.Mock).mockResolvedValue({});

    await addTeacher(null, mockFormData);

    const expectedPayload = {
      firstName: 'firstName-value',
      lastName: 'lastName-value',
      phone: 'phone-value',
      email: 'email-value',
      address: 'address-value',
      city: 'city-value',
      birthday: 'birthday-value',
      cityEducation: 'cityEducation-value',
      degree: 'degree-value',
      description: 'description-value',
      endEducation: 'endEducation-value',
      expertise: 'expertise-value',
      photo: 'photo-value',
      startEducation: 'startEducation-value',
      subject: 'subject-value',
      university: 'university-value',
      schedule: MOCK_TEACHER_SCHEDULES,
    };

    expect(apiRequest).toHaveBeenCalledWith(
      HTTP_METHOD.POST,
      API_PATHS.TEACHERS,
      { data: expectedPayload },
    );
  });

  it('should fail to add teacher if apiRequest fails', async () => {
    (apiRequest as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to add teacher'),
    );

    const formData = new FormData();
    formData.append('name', 'John Doe');

    await expect(addTeacher({}, formData)).rejects.toThrow(
      'Failed to add teacher',
    );
  });

  it('handle editTeacher sends PUT request with correctly', async () => {
    mockFormData.append('documentId', '1');
    (apiRequest as jest.Mock).mockResolvedValue({});

    await editTeacher(null, mockFormData);

    const expectedPayload = {
      firstName: 'firstName-value',
      lastName: 'lastName-value',
      phone: 'phone-value',
      email: 'email-value',
      address: 'address-value',
      city: 'city-value',
      birthday: 'birthday-value',
      cityEducation: 'cityEducation-value',
      degree: 'degree-value',
      description: 'description-value',
      endEducation: 'endEducation-value',
      expertise: 'expertise-value',
      photo: 'photo-value',
      startEducation: 'startEducation-value',
      subject: 'subject-value',
      university: 'university-value',
      schedule: MOCK_TEACHER_SCHEDULES,
    };

    const expectedUrl = `${API_PATHS.TEACHERS}/${1}`;

    expect(apiRequest).toHaveBeenCalledWith(HTTP_METHOD.PUT, expectedUrl, {
      data: expectedPayload,
    });
  });

  it('should fail to edit teacher if apiRequest fails', async () => {
    (apiRequest as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to edit teacher'),
    );

    const formData = new FormData();
    formData.append('documentId', '123');
    formData.append('name', 'Jane Doe');

    await expect(editTeacher({}, formData)).rejects.toThrow(
      'Failed to edit teacher',
    );
  });
});
