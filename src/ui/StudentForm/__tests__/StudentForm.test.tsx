import { ReactNode } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import userEvent from '@testing-library/user-event';

// Actions
import { addStudent, editStudent } from '@/actions';

// Constants
import { CLASS_NAME } from '@/constants';

// Types
import { IStudent } from '@/types';

// Components
import StudentForm from '..';

// Mock actions
jest.mock('@/actions', () => ({
  addStudent: jest.fn(),
  editStudent: jest.fn(),
}));

const queryClient = new QueryClient();

const renderWithProviders = (component: ReactNode) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <ChakraProvider>{component}</ChakraProvider>
      </MemoryRouter>
    </QueryClientProvider>,
  );

const defaultValues: IStudent = {
  firstName: 'Johnny ',
  lastName: 'Ahmad',
  birthday: '1999-03-25',
  city: 'Jakarta',
  parentName: 'John Doe',
  email: 'john.doe@example.com',
  phone: '2345678901',
  address: 'Jakarta',
  grade: CLASS_NAME.VII_A,
  avatar: '',
  parent: {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '2345678901',
    address: 'Jakarta',
  },
  payment: 'unpaid',
};

describe('StudentForm', () => {
  const defaultProps = {
    defaultValues: defaultValues,
  };

  it('renders snapshot with default values', () => {
    const { container } = renderWithProviders(
      <StudentForm {...defaultProps} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders snapshot with empty values', () => {
    const { getAllByPlaceholderText } = renderWithProviders(<StudentForm />);

    const firstNameInput = getAllByPlaceholderText(
      'Please enter your first name',
    )[0];

    expect(firstNameInput).toBeInTheDocument();
  });

  it('validates required fields on blur', async () => {
    const { getAllByLabelText, getByText } = renderWithProviders(
      <StudentForm {...defaultProps} />,
    );

    const firstNameInput = getAllByLabelText('First Name *')[0];
    fireEvent.change(firstNameInput, { target: { value: '' } });
    fireEvent.blur(firstNameInput);

    await waitFor(() => {
      expect(getByText(/first name is required/i)).toBeInTheDocument();
    });
  });

  it('submits the form and calls addStudent for new students', async () => {
    const {
      getAllByLabelText,
      getByRole,
      getByLabelText,
      getByPlaceholderText,
    } = renderWithProviders(<StudentForm />);

    const firstNameInput = getAllByLabelText('First Name *')[0];
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    const lastNameInput = getAllByLabelText('Last Name *')[0];
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });

    const birthdayInput = getByLabelText('Date & Place of Birth *');
    fireEvent.change(birthdayInput, { target: { value: '2000-01-01' } });

    const cityInput = getByPlaceholderText('Please enter your city');
    fireEvent.change(cityInput, { target: { value: 'New York' } });

    const parentNameInput = getByLabelText('Parent Name *');
    fireEvent.change(parentNameInput, { target: { value: 'Jane Smith' } });

    const emailInput = getAllByLabelText('Email *')[0];
    fireEvent.change(emailInput, {
      target: { value: 'jane.smith@example.com' },
    });
    const phoneInput = getAllByLabelText('Phone *')[0];
    fireEvent.change(phoneInput, { target: { value: '2345678901' } });

    const addressInput = getAllByLabelText('Address *')[0];
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    const firstNameParentInput = getAllByLabelText('First Name *')[1];
    fireEvent.change(firstNameParentInput, { target: { value: 'Jane' } });

    const lastNameParentInput = getAllByLabelText('Last Name *')[1];
    fireEvent.change(lastNameParentInput, { target: { value: 'Smith' } });

    const emailParentInput = getAllByLabelText('Email *')[1];
    fireEvent.change(emailParentInput, {
      target: { value: 'jane.smith@example.com' },
    });

    const phoneParentInput = getAllByLabelText('Phone *')[1];
    fireEvent.change(phoneParentInput, { target: { value: '2345678901' } });

    const addressParentInput = getAllByLabelText('Address *')[1];
    fireEvent.change(addressParentInput, { target: { value: '123 Main St' } });

    const submitButton = getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(addStudent).toHaveBeenCalled();
    });
  });

  it('submits the form and calls editStudent for existing students', async () => {
    const editProps = {
      ...defaultProps,
      defaultValues: { ...defaultProps.defaultValues, documentId: '123' },
    };

    (editStudent as jest.Mock).mockResolvedValueOnce({
      data: { documentId: '123' },
    });

    const { getByRole, getAllByLabelText, getByText } = renderWithProviders(
      <StudentForm {...editProps} />,
    );

    const firstNameInput = getAllByLabelText('First Name *')[0];
    fireEvent.change(firstNameInput, { target: { value: 'David' } });

    const fileInput = getByText('Drag and drop or click here to select file');
    const file = new File(['content'], 'test-file.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const submitButton = getByRole('button', { name: 'Submit' });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(editStudent).toHaveBeenCalled();
    });
  });
});
