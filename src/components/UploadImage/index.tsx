'use client';

import {
  Avatar,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useCallback, useMemo, useRef, useState, useTransition } from 'react';

// Components
import { CustomToast, Fallback } from '@/components';

// Constants
import {
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  TOAST_STATUS,
  VALIDATION_RULES,
} from '@/constants';

// Types
import { IFile } from '@/types';

// Hooks
import { useUploadImage } from '@/hooks';

interface IUploadImageProps {
  imageUrl?: string;
  onFileChange: (file: string) => void;
}

const UploadImage = ({ imageUrl = '', onFileChange }: IUploadImageProps) => {
  const { handleUploadImage } = useUploadImage();
  const toast = useToast();
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(
    imageUrl,
  );
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    control,
    setValue,
    trigger,
    clearErrors,
    formState: { errors },
  } = useForm<IFile>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });
  const colorLabel = errors?.image ? 'red' : 'darkBlue';
  const colorBorder = errors?.image ? 'red' : 'primary';

  const handleOpenFile = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleUploadFile = useCallback(
    async (file: File) => {
      try {
        const isValid = await trigger('image');

        if (isValid) {
          startTransition(async () => {
            const imageUrl = await handleUploadImage(file);
            const baseImageUrl = URL.createObjectURL(file);

            startTransition(() => {
              setSelectedImageUrl(imageUrl || baseImageUrl);
              onFileChange(imageUrl || baseImageUrl);
              clearErrors('image');

              toast({
                render: () => (
                  <CustomToast
                    status={TOAST_STATUS.SUCCESS}
                    message={SUCCESS_MESSAGES.UPLOAD_IMAGE_SUCCESS}
                  />
                ),
              });
            });
          });
        }
      } catch (error) {
        toast({
          render: () => (
            <CustomToast
              status={TOAST_STATUS.ERROR}
              message={ERROR_MESSAGES.UPLOAD_IMAGE_FAILED}
            />
          ),
        });
      }
    },
    [clearErrors, handleUploadImage, onFileChange, toast, trigger],
  );

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (file) {
        setValue('image', file, { shouldValidate: true });

        handleUploadFile(file);
      }
    },
    [handleUploadFile, setValue],
  );

  const renderImage = useMemo(() => {
    if (isPending) {
      return <Fallback />;
    }

    if (selectedImageUrl) {
      return <Avatar size="full" borderRadius="2xl" src={selectedImageUrl} />;
    }

    if (!errors.image) {
      return (
        <Text color="whiteSmoke" textAlign="center">
          Drag and drop or click here to select file
        </Text>
      );
    }

    return null;
  }, [errors.image, isPending, selectedImageUrl]);

  return (
    <VStack alignItems="flex-start" gap={0}>
      <FormLabel
        fontSize="md"
        fontWeight="semibold"
        marginInlineEnd={0}
        minW="max-content"
        color={colorLabel}
      >
        Photo *
      </FormLabel>
      <Flex
        w={175}
        h={175}
        p={2}
        border="1px dashed"
        borderColor={colorBorder}
        direction="column"
        borderRadius="2xl"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        cursor="pointer"
        onClick={handleOpenFile}
      >
        {renderImage}

        <Controller
          control={control}
          rules={VALIDATION_RULES.IMAGE}
          name="image"
          render={() => (
            <FormControl isInvalid={!!errors?.image}>
              <Input
                w="full"
                title="Upload Image"
                hidden
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />

              {errors?.image && (
                <FormErrorMessage>
                  <Flex direction="column" gap={4} color="red">
                    <Text>{errors.image.message}</Text>
                    <Text>Please select again!!!</Text>
                  </Flex>
                </FormErrorMessage>
              )}
            </FormControl>
          )}
        />
      </Flex>
    </VStack>
  );
};

export default UploadImage;
