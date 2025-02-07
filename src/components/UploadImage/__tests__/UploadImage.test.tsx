import { render, fireEvent, waitFor } from '@testing-library/react';

// Hooks
import { useUploadImage } from '@/hooks';

// Components
import UploadImage from '..';

// Constants
import { VALIDATION_RULES } from '@/constants';

jest.mock('@/hooks', () => ({
  useUploadImage: jest.fn(),
}));

describe('UploadImage Component', () => {
  const mockHandleUploadImage = jest.fn();
  const mockOnFileChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useUploadImage as jest.Mock).mockReturnValue({
      handleUploadImage: mockHandleUploadImage,
    });
  });

  it('renders the component with initial props', () => {
    const { getByText } = render(
      <UploadImage onFileChange={mockOnFileChange} />,
    );

    expect(
      getByText('Drag and drop or click here to select file'),
    ).toBeInTheDocument();
    expect(getByText('Photo *')).toBeInTheDocument();
  });

  it('opens file input when clicking on the upload area', () => {
    const { getByText, getByTitle } = render(
      <UploadImage onFileChange={mockOnFileChange} />,
    );

    const uploadArea = getByText(
      'Drag and drop or click here to select file',
    ).closest('div');
    const fileInput = getByTitle('Upload Image');

    jest.spyOn(fileInput, 'click');

    fireEvent.click(uploadArea!);

    expect(fileInput.click).toHaveBeenCalled();
  });

  it('uploads and sets the image when a valid file is selected', async () => {
    const mockImageUrl = 'https://example.com/image.jpg';
    mockHandleUploadImage.mockResolvedValueOnce(mockImageUrl);

    const { getByTitle } = render(
      <UploadImage onFileChange={mockOnFileChange} />,
    );

    const file = new File(['image content'], 'image.jpg', {
      type: 'image/jpeg',
    });
    const fileInput = getByTitle('Upload Image');

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() =>
      expect(mockHandleUploadImage).toHaveBeenCalledWith(file),
    );
    expect(mockOnFileChange).toHaveBeenCalledWith(mockImageUrl);
  });

  it('shows error message when file validation fails', async () => {
    VALIDATION_RULES.IMAGE.validate = jest.fn().mockReturnValue(false);

    const { getByTitle, getByText } = render(
      <UploadImage onFileChange={mockOnFileChange} />,
    );

    const file = new File(['invalid content'], 'invalid.txt', {
      type: 'text/plain',
    });
    const fileInput = getByTitle('Upload Image');

    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() =>
      expect(getByText('Please select again!!!')).toBeInTheDocument(),
    );

    const errorMessage = getByText('Please select again!!!');
    expect(errorMessage).toBeInTheDocument();
    expect(mockOnFileChange).not.toHaveBeenCalled();
  });
});
