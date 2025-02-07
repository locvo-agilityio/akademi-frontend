import { Button, Flex, HStack, Text, useToast, VStack } from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useActionState, useCallback, useEffect, useTransition } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';

// Components
import {
  CustomToast,
  InputField,
  TextareaField,
  UploadImage,
} from '@/components';

// Constants
import {
  ADDITIONAL_TEACHER_INFO,
  BASIC_TEACHER_INFO,
  EDUCATION_TEACHER_INFO,
  ERROR_MESSAGES,
  PUBLIC_ROUTERS,
  SUCCESS_MESSAGES,
  teachersQueryKeys,
  TOAST_STATUS,
  VALIDATION_RULES,
} from '@/constants';

// Types
import { ITeacher } from '@/types';

// Actions
import { addTeacher, editTeacher } from '@/actions';

interface ITeacherFormProps {
  defaultValues?: ITeacher;
}

const TeacherForm = ({ defaultValues }: ITeacherFormProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const isEdit = !!defaultValues?.documentId;

  const actionForm = isEdit ? editTeacher : addTeacher;
  const [state, formAction] = useActionState(actionForm, undefined);

  const {
    firstName = '',
    lastName = '',
    phone = '',
    email = '',
    address = '',
    city = '',
    birthday = '',
    cityEducation = '',
    degree = '',
    description = '',
    endEducation = '',
    expertise = '',
    photo = '',
    startEducation = '',
    subject = '',
    university = '',
  } = defaultValues || {};

  const initialValues: ITeacher = {
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    email: email,
    address: address,
    city: city,
    birthday: birthday,
    cityEducation: cityEducation,
    degree: degree,
    description: description,
    endEducation: endEducation,
    expertise: expertise,
    photo: photo,
    startEducation: startEducation,
    subject: subject,
    university: university,
  };

  const {
    control,
    setValue,
    getValues,
    formState: { isValid, isDirty },
  } = useForm<ITeacher>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
  });

  const handleFileChange = useCallback(
    (file: string) => {
      setValue('photo', file, { shouldDirty: true });
    },
    [setValue],
  );

  const actionSubmit = useCallback(
    async (formData: FormData) => {
      try {
        startTransition(() => {
          formData.append('photo', getValues('photo'));

          if (isEdit)
            formData.append('documentId', defaultValues?.documentId as string);

          formAction(formData);

          queryClient.invalidateQueries({
            queryKey: teachersQueryKeys.lists(),
          });

          toast({
            render: () => (
              <CustomToast
                status={TOAST_STATUS.SUCCESS}
                message={
                  isEdit
                    ? SUCCESS_MESSAGES.EDIT_TEACHER_SUCCESS
                    : SUCCESS_MESSAGES.ADD_TEACHER_SUCCESS
                }
              />
            ),
          });
        });
      } catch (err) {
        toast({
          render: () => (
            <CustomToast
              status={TOAST_STATUS.ERROR}
              message={
                isEdit
                  ? ERROR_MESSAGES.EDIT_TEACHER_FAILED
                  : ERROR_MESSAGES.ADD_TEACHER_FAILED
              }
            />
          ),
        });
      }
    },
    [defaultValues?.documentId, getValues, isEdit, queryClient, toast],
  );

  useEffect(() => {
    if (state) {
      queryClient.setQueryData(
        teachersQueryKeys.detail(state.data.documentId),
        state,
      );

      navigate(PUBLIC_ROUTERS.TEACHERS);
    }
  }, [state, queryClient, navigate]);

  return (
    <VStack as="form" alignItems="flex-end" w="full" action={actionSubmit}>
      <VStack mt={5} w="full" bgColor="white" borderRadius="2xl">
        <Text
          as="h3"
          w="full"
          px={10}
          h="60px"
          borderTopRadius="2xl"
          bgColor="primary"
          color="white"
          size="lg"
          fontWeight="bold"
          display="flex"
          alignItems="center"
        >
          Personal Details
        </Text>

        <HStack w="full" alignItems="flex-start" p={8} gap={10}>
          <Flex w="full" gap={7} direction="column" justifyContent="flex-start">
            {BASIC_TEACHER_INFO.map(
              ({
                name,
                label,
                placeholder,
                type,
                rules,
                ariaLabel,
                min,
                max,
              }) => (
                <Controller
                  key={name}
                  control={control}
                  rules={rules}
                  name={name}
                  render={({ field, fieldState: { error } }) =>
                    name === 'address' || name === 'description' ? (
                      <TextareaField
                        h={175}
                        label={label}
                        placeholder={placeholder}
                        {...field}
                        isError={!!error}
                        errorMessages={error?.message}
                        aria-label={ariaLabel}
                      />
                    ) : (
                      <InputField
                        label={label}
                        placeholder={placeholder}
                        type={type}
                        min={min}
                        max={max}
                        {...field}
                        isError={!!error}
                        errorMessages={error?.message}
                        aria-label={ariaLabel}
                      />
                    )
                  }
                />
              ),
            )}
          </Flex>

          <Flex w="full" gap={7} direction="column" justifyContent="flex-start">
            {ADDITIONAL_TEACHER_INFO.map(
              ({ name, label, placeholder, type, rules, ariaLabel }) => (
                <Controller
                  key={name}
                  control={control}
                  rules={rules}
                  name={name}
                  render={({ field, fieldState: { error } }) => (
                    <InputField
                      label={label}
                      placeholder={placeholder}
                      type={type}
                      {...field}
                      isError={!!error}
                      errorMessages={error?.message}
                      aria-label={ariaLabel}
                    />
                  )}
                />
              ),
            )}

            <UploadImage imageUrl={photo} onFileChange={handleFileChange} />

            <Controller
              key="city"
              control={control}
              rules={VALIDATION_RULES.CITY}
              name="city"
              render={({ field, fieldState: { error } }) => (
                <InputField
                  label="Place of Birth *"
                  placeholder="Please enter your city"
                  {...field}
                  isError={!!error}
                  errorMessages={error?.message}
                  aria-label="city"
                />
              )}
            />

            <Controller
              key="expertise"
              control={control}
              rules={VALIDATION_RULES.CITY}
              name="expertise"
              render={({ field, fieldState: { error } }) => (
                <InputField
                  label="Expertise *"
                  placeholder="Please enter your expertise"
                  {...field}
                  isError={!!error}
                  errorMessages={error?.message}
                  aria-label="expertise"
                />
              )}
            />
          </Flex>
        </HStack>
      </VStack>

      <VStack mt={5} w="full" bgColor="white" borderRadius="2xl">
        <Text
          as="h3"
          w="full"
          px={10}
          h="60px"
          borderTopRadius="2xl"
          bgColor="primary"
          color="white"
          size="lg"
          fontWeight="bold"
          display="flex"
          alignItems="center"
        >
          Education
        </Text>

        <HStack w="full" alignItems="flex-start" p={8} gap={10}>
          <Flex w="full" gap={7} direction="column" justifyContent="flex-start">
            <Controller
              key="university"
              control={control}
              rules={VALIDATION_RULES.UNIVERSITY}
              name="university"
              render={({ field, fieldState: { error } }) => (
                <InputField
                  label="University *"
                  placeholder="Please enter your university"
                  {...field}
                  isError={!!error}
                  errorMessages={error?.message}
                  aria-label="university"
                />
              )}
            />

            <Flex
              direction={{ base: 'column', xl: 'row' }}
              gap={6}
              alignItems="flex-end"
            >
              <Controller
                key="startEducation"
                control={control}
                rules={VALIDATION_RULES.DATE}
                name="startEducation"
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    label="Start & End Date *"
                    type="date"
                    placeholder="Please enter your start education"
                    {...field}
                    isError={!!error}
                    errorMessages={error?.message}
                    aria-label="birthday"
                  />
                )}
              />

              <Controller
                key="city"
                control={control}
                rules={VALIDATION_RULES.DATE}
                name="endEducation"
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    title="End Date"
                    type="date"
                    placeholder="Please enter your end education"
                    {...field}
                    isError={!!error}
                    errorMessages={error?.message}
                    aria-label="city"
                  />
                )}
              />
            </Flex>
          </Flex>

          <Flex w="full" gap={7} direction="column" justifyContent="flex-start">
            {EDUCATION_TEACHER_INFO.map(
              ({ name, label, placeholder, type, rules, ariaLabel }) => (
                <Controller
                  key={name}
                  control={control}
                  rules={rules}
                  name={name}
                  render={({ field, fieldState: { error } }) => (
                    <InputField
                      label={label}
                      placeholder={placeholder}
                      type={type}
                      {...field}
                      isError={!!error}
                      errorMessages={error?.message}
                      aria-label={ariaLabel}
                    />
                  )}
                />
              ),
            )}
          </Flex>
        </HStack>
      </VStack>

      <HStack mt={4} gap={3}>
        <Button
          as={Link}
          to={PUBLIC_ROUTERS.TEACHERS}
          w="full"
          p={7}
          variant="secondary"
          borderRadius="full"
        >
          Cancel
        </Button>

        <Button
          w="full"
          p={7}
          variant="primary"
          borderRadius="full"
          type="submit"
          isLoading={isPending}
          isDisabled={isPending || !isValid || !isDirty}
        >
          Submit
        </Button>
      </HStack>
    </VStack>
  );
};

export default TeacherForm;
