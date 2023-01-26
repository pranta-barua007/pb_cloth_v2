import { InputHTMLAttributes, FC, forwardRef } from 'react';

import { FormInputLabel, Input, Group } from './form-input.styles';

export type FormInputProps = {
  label: string;
  errorMessage?: string | undefined;
} & InputHTMLAttributes<HTMLInputElement>;

/* eslint-disable react/display-name */
const FormInput: FC<FormInputProps> = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, errorMessage, ...otherProps }, ref) => {
    return (
      <Group>
        <Input {...otherProps} ref={ref} value={otherProps.value || ''} />
        {label && (
          <FormInputLabel
            shrink={Boolean(
              otherProps.value && typeof otherProps.value === 'string' && otherProps.value.length,
            )}
            error={!!errorMessage}
          >
            {errorMessage ? errorMessage : label}
          </FormInputLabel>
        )}
      </Group>
    );
  },
);

export default FormInput;
