import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

// Components
import TeacherForm from '..';

// Mocks
import { MOCK_TEACHERS } from '@/__mocks__';

// Hooks
import { useGetTeacher, useUploadImage } from '@/hooks';

const client = new QueryClient();

const mockHandleUploadImage = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(() => ({})),
  useNavigate: jest.fn(() => ({})),
}));

jest.mock('@/hooks', () => ({
  useUploadImage: jest.fn(),
  useGetTeacher: jest.fn(() => ({
    teacher: MOCK_TEACHERS[0],
  })),
}));

describe('TeacherForm', () => {
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
          <TeacherForm />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('should render fallbackUI when loading', () => {
    (useGetTeacher as jest.Mock).mockReturnValue({
      teacher: null,
      isTeacherLoading: true,
    });

    const { container } = render(
      <BrowserRouter>
        <QueryClientProvider client={client}>
          <TeacherForm />
        </QueryClientProvider>
      </BrowserRouter>,
    );

    expect(container).toBeInTheDocument();
  });
});
