export type TField<T> = {
  name: keyof T;
  label: string;
  placeholder: string;
  min?: string;
  max?: string;
  type: 'text' | 'email' | 'password' | 'datetime-local';
  rules: {
    required: string;
    pattern: {
      value: RegExp;
      message: string;
    };
  };
  ariaLabel: string;
};
