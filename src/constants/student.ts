export enum CLASS_NAME {
  VII_A = 'VII A',
  VII_B = 'VII B',
  VII_C = 'VII C',
}

export const DEFAULT_AMOUNT = 50000;

export const CLASS_NAME_OPTIONS = [
  {
    name: 'grade',
    value: CLASS_NAME.VII_A,
    colorScheme: 'purple',
    bgColor: 'secondary',
    text: CLASS_NAME.VII_A,
  },
  {
    name: 'grade',
    value: CLASS_NAME.VII_B,
    colorScheme: 'purple',
    bgColor: 'yellow',
    text: CLASS_NAME.VII_B,
  },
  {
    name: 'grade',
    value: CLASS_NAME.VII_C,
    colorScheme: 'purple',
    bgColor: 'darkBlue',
    text: CLASS_NAME.VII_C,
  },
];

export const studentKeys = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'parentName',
  'birthday',
  'city',
  'avatar',
  'address',
  'payment',
  'grade',
];

export const parentKeys = [
  'firstName',
  'lastName',
  'email',
  'phone',
  'address',
];
