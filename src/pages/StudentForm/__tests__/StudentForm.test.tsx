import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Components
import StudentForm from '..';

// Mocks
import { MOCK_STUDENTS } from '@/__mocks__';

// Hooks
import { useGetStudent, useUploadImage } from '@/hooks';

const client = new QueryClient();

const mockHandleUploadImage = jest.fn();

jest.mock('@/hooks', () => ({
  useUploadImage: jest.fn(),
  useGetStudent: jest.fn(() => ({
    student: MOCK_STUDENTS[0],
    isStudentLoading: false,
  })),
}));

describe('StudentForm', () => {
  beforeEach(() => {
    (useUploadImage as jest.Mock).mockReturnValue({
      handleUploadImage: mockHandleUploadImage,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render successfully', () => {
    const { container } = render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <StudentForm />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render fallbackUI when loading', () => {
    (useGetStudent as jest.Mock).mockReturnValue({
      student: null,
      isStudentLoading: true,
    });

    const { container } = render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <StudentForm />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});
