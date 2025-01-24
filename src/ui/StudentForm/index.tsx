import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate } from 'react-router-dom';
import { useActionState, useCallback, useEffect, useTransition } from 'react';

// Components
import {
  CustomToast,
  InputField,
  TextareaField,
  UploadImage,
} from '@/components';

// Constants
import {
  CLASS_NAME,
  CLASS_NAME_OPTIONS,
  ERROR_MESSAGES,
  PUBLIC_ROUTERS,
  studentsQueryKeys,
  SUCCESS_MESSAGES,
  TOAST_STATUS,
  VALIDATION_RULES,
} from '@/constants';

// Types
import { IStudent } from '@/types';

// Utils
import {
  ADDITIONAL_PARENT_STUDENT_INFO,
  BASIC_PARENT_STUDENT_INFO,
  BASIC_STUDENT_INFO,
} from '@/utils';

// Actions
import { addStudent, editStudent } from '@/actions';

interface IStudentFormProps {
  defaultValues?: IStudent;
}

const StudentForm = ({ defaultValues }: IStudentFormProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const isEdit = !!defaultValues?.documentId;

  const actionForm = isEdit ? editStudent : addStudent;

  const [state, formAction] = useActionState(actionForm, undefined);
  const {
    firstName = '',
    lastName = '',
    parentName = '',
    phone = '',
    email = '',
    address = '',
    city = '',
    grade = CLASS_NAME.VII_A,
    avatar = '',
    birthday = '',
    parent = { firstName: '', lastName: '', email: '', phone: '', address: '' },
    payment = 'unpaid',
    documentId = '',
  } = defaultValues || {};

  const initialValues: IStudent = {
    firstName: firstName,
    lastName: lastName,
    parentName: parentName,
    phone: phone,
    email: email,
    address: address,
    city: city,
    grade: grade,
    avatar: avatar,
    birthday: birthday,
    parent: parent,
    payment: payment,
    documentId: documentId,
  };

  const {
    control,
    setValue,
    getValues,
    formState: { isValid, isDirty },
  } = useForm<IStudent>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: initialValues,
  });

  const handleFileChange = useCallback(
    (file: string) => {
      setValue('avatar', file, { shouldDirty: true });
    },
    [setValue],
  );

  const actionSubmit = useCallback(
    async (formData: FormData) => {
      try {
        startTransition(() => {
          formData.append('avatar', getValues('avatar'));

          if (isEdit)
            formData.append('documentId', defaultValues?.documentId as string);

          formAction(formData);

          queryClient.invalidateQueries({
            queryKey: studentsQueryKeys.lists(),
          });

          toast({
            render: () => (
              <CustomToast
                status={TOAST_STATUS.SUCCESS}
                message={
                  isEdit
                    ? SUCCESS_MESSAGES.EDIT_STUDENT_SUCCESS
                    : SUCCESS_MESSAGES.ADD_STUDENT_SUCCESS
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
                  ? ERROR_MESSAGES.EDIT_STUDENT_FAILED
                  : ERROR_MESSAGES.ADD_STUDENT_FAILED
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
        studentsQueryKeys.detail(state.data.documentId),
        state,
      );

      navigate(PUBLIC_ROUTERS.STUDENTS);
    }
  }, [navigate, queryClient, state]);

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
          Student Details
        </Text>

        <HStack w="full" alignItems="flex-start" p={8} gap={10}>
          <Controller
            key="avatar"
            control={control}
            name="avatar"
            render={() => (
              <UploadImage imageUrl={avatar} onFileChange={handleFileChange} />
            )}
          />

          <Flex w="full" gap={7} direction="column" justifyContent="flex-start">
            <Controller
              key="firstName"
              control={control}
              rules={VALIDATION_RULES.FIRST_NAME}
              name="firstName"
              render={({ field, fieldState: { error } }) => (
                <InputField
                  label="First Name *"
                  placeholder="Please enter your first name"
                  {...field}
                  isError={!!error}
                  errorMessages={error?.message}
                  aria-label="first name"
                />
              )}
            />

            <Flex
              direction={{ base: 'column', xl: 'row' }}
              gap={6}
              alignItems="flex-end"
            >
              <Controller
                key="birthday"
                control={control}
                rules={VALIDATION_RULES.BIRTH_DATE}
                name="birthday"
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    label="Date & Place of Birth *"
                    type="date"
                    max="2009-12-31"
                    placeholder="Please enter your birthday"
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
                rules={VALIDATION_RULES.CITY}
                name="city"
                render={({ field, fieldState: { error } }) => (
                  <InputField
                    placeholder="Please enter your city"
                    {...field}
                    isError={!!error}
                    errorMessages={error?.message}
                    aria-label="city"
                  />
                )}
              />
            </Flex>

            <Controller
              key="email"
              control={control}
              rules={VALIDATION_RULES.EMAIL}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <InputField
                  label="Email *"
                  type="email"
                  placeholder="Please enter your email"
                  {...field}
                  isError={!!error}
                  errorMessages={error?.message}
                  aria-label="email"
                />
              )}
            />

            <Controller
              key="address"
              control={control}
              rules={VALIDATION_RULES.ADDRESS}
              name="address"
              render={({ field, fieldState: { error } }) => (
                <TextareaField
                  label="Address"
                  placeholder="Please enter your address"
                  {...field}
                  isError={!!error}
                  errorMessages={error?.message}
                  aria-label="address"
                />
              )}
            />
          </Flex>

          <Flex w="full" gap={7} direction="column" justifyContent="flex-start">
            {BASIC_STUDENT_INFO.map(
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
            <Controller
              key="grade"
              control={control}
              name="grade"
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <FormLabel
                    fontSize="md"
                    fontWeight="semibold"
                    marginInlineEnd={0}
                    minW="max-content"
                    color="darkBlue"
                  >
                    Class *
                  </FormLabel>

                  <RadioGroup
                    onChange={onChange}
                    value={value}
                    size="sm"
                    display="flex"
                    gap={10}
                  >
                    {CLASS_NAME_OPTIONS.map((option) => (
                      <Radio
                        key={option.value}
                        name={option.name}
                        value={option.value}
                        colorScheme={option.colorScheme}
                      >
                        <Text
                          p={2}
                          fontSize="xs"
                          color="white"
                          alignItems="center"
                          bgColor={option.bgColor}
                          justifyContent="center"
                          borderRadius="full"
                        >
                          {option.text}
                        </Text>
                      </Radio>
                    ))}
                  </RadioGroup>
                </FormControl>
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
          Parent Details
        </Text>

        <HStack w="full" alignItems="flex-start" p={8} gap={10}>
          <Flex w="full" gap={7} direction="column" justifyContent="flex-start">
            {BASIC_PARENT_STUDENT_INFO.map(
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

            <Controller
              key="address"
              control={control}
              rules={VALIDATION_RULES.ADDRESS}
              name="parent.address"
              render={({ field, fieldState: { error } }) => (
                <TextareaField
                  label="Address"
                  placeholder="Please enter your address"
                  {...field}
                  isError={!!error}
                  errorMessages={error?.message}
                  aria-label="address"
                />
              )}
            />
          </Flex>

          <Flex w="full" gap={7} direction="column" justifyContent="flex-start">
            {ADDITIONAL_PARENT_STUDENT_INFO.map(
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

            <Controller
              key="payment"
              control={control}
              name="payment"
              render={({ field: { onChange, value } }) => (
                <FormControl>
                  <FormLabel
                    fontSize="md"
                    fontWeight="semibold"
                    marginInlineEnd={0}
                    minW="max-content"
                    color="darkBlue"
                  >
                    Payments *
                  </FormLabel>

                  <RadioGroup onChange={onChange} value={value} size="sm">
                    <Stack direction="row">
                      <Radio
                        name="payment"
                        value="cash"
                        colorScheme="purple"
                        defaultChecked
                      >
                        Cash
                      </Radio>
                      <Radio name="payment" value="debit" colorScheme="purple">
                        Debit
                      </Radio>
                      <Radio name="payment" value="unpaid" colorScheme="purple">
                        Unpaid
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              )}
            />
          </Flex>
        </HStack>
      </VStack>

      <HStack mt={4} gap={3}>
        <Button
          as={Link}
          to={PUBLIC_ROUTERS.STUDENTS}
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

export default StudentForm;
