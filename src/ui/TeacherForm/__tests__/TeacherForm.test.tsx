import { ReactNode } from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Actions
import { addTeacher, editTeacher } from '@/actions';

// Components
import TeacherForm from '..';

// Types
import { ITeacher } from '@/types';

// Mock actions
jest.mock('@/actions', () => ({
  addTeacher: jest.fn(),
  editTeacher: jest.fn(),
}));

const queryClient = new QueryClient();

const renderWithProviders = (component: ReactNode) =>
  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {component}
      </BrowserRouter>
    </QueryClientProvider>,
  );

const defaultValues: ITeacher = {
  firstName: 'John',
  lastName: 'Doe',
  phone: '2345678901',
  email: 'john.doe@example.com',
  address: 'Jakarta',
  city: 'Jakarta',
  birthday: '1999-03-25',
  cityEducation: 'Jakarta',
  degree: 'S1',
  description: 'Saya seorang guru',
  endEducation: '2020',
  expertise: 'Matematika',
  photo: '',
  startEducation: '2010',
  subject: 'Matematika',
  university: 'Universitas Indonesia',
};

describe('TeacherForm', () => {
  const defaultProps = {
    defaultValues: defaultValues,
  };

  it('renders the form with default values', () => {
    const { container } = renderWithProviders(<TeacherForm />);

    expect(container).toBeInTheDocument();
  });

  it('validates required fields on blur', async () => {
    const { getAllByLabelText, getByText } = renderWithProviders(
      <TeacherForm {...defaultProps} />,
    );

    const firstNameInput = getAllByLabelText('First Name *')[0];
    fireEvent.change(firstNameInput, { target: { value: '' } });
    fireEvent.blur(firstNameInput);

    await waitFor(() => {
      expect(getByText(/first name is required/i)).toBeInTheDocument();
    });
  });

  it('submits the form and calls addTeacher for new teachers', async () => {
    const { getAllByLabelText, getByRole, getByLabelText, getByTitle } =
      renderWithProviders(<TeacherForm />);

    const firstNameInput = getAllByLabelText('First Name *')[0];
    fireEvent.change(firstNameInput, { target: { value: 'Jane' } });

    const lastNameInput = getAllByLabelText('Last Name *')[0];
    fireEvent.change(lastNameInput, { target: { value: 'Smith' } });

    const emailInput = getAllByLabelText('Email *')[0];
    fireEvent.change(emailInput, {
      target: { value: 'jane.smith@example.com' },
    });

    const addressInput = getByLabelText('Address *');
    fireEvent.change(addressInput, { target: { value: '123 Main St' } });

    const phoneInput = getAllByLabelText('Phone *')[0];
    fireEvent.change(phoneInput, { target: { value: '2345678901' } });

    const birthdayInput = getByLabelText('Date of Birth *');
    fireEvent.change(birthdayInput, { target: { value: '2000-01-01' } });

    const cityInput = getByLabelText('Place of Birth *');
    fireEvent.change(cityInput, { target: { value: 'New York' } });

    const subjectInput = getByLabelText('Subject');
    fireEvent.change(subjectInput, { target: { value: 'Math' } });

    const expertiseInput = getByLabelText('Expertise *');
    fireEvent.change(expertiseInput, { target: { value: 'Math' } });

    const descriptionInput = getByLabelText('Description *');
    fireEvent.change(descriptionInput, { target: { value: 'Math' } });

    const universityInput = getByLabelText('University *');
    fireEvent.change(universityInput, {
      target: { value: 'New York University' },
    });

    const degreeInput = getByLabelText('Degree *');
    fireEvent.change(degreeInput, { target: { value: 'Bachelor' } });

    const cityEducationInput = getByLabelText('City *');
    fireEvent.change(cityEducationInput, { target: { value: 'New York' } });

    const startEducationInput = getByLabelText('Start & End Date *');
    fireEvent.change(startEducationInput, {
      target: { value: '2020-01-01' },
    });

    const endEducationInput = getByTitle('End Date');
    fireEvent.change(endEducationInput, {
      target: { value: '20024-01-01' },
    });

    const submitButton = getByRole('button', { name: 'Submit' });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(addTeacher).toHaveBeenCalled();
    });
  });

  it('submits the form and calls editTeacher for existing teachers', async () => {
    const editProps = {
      ...defaultProps,
      defaultValues: { ...defaultProps.defaultValues, documentId: '123' },
    };

    (editTeacher as jest.Mock).mockResolvedValueOnce({
      data: { documentId: '123' },
    });

    const { getByRole, getAllByLabelText, getByText } = renderWithProviders(
      <TeacherForm {...editProps} />,
    );

    const firstNameInput = getAllByLabelText('First Name *')[0];
    fireEvent.change(firstNameInput, { target: { value: 'David' } });

    const fileInput = getByText('Drag and drop or click here to select file');
    const file = new File(['content'], 'test-file.jpg', { type: 'image/jpeg' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const submitButton = getByRole('button', { name: 'Submit' });

    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(editTeacher).toHaveBeenCalled();
    });
  });
});
