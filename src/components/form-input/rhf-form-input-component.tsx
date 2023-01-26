import { FC } from 'react';
import { useFormContext, Controller } from 'react-hook-form';

import { FormInputProps } from './form-input.component';
import FormInput from './form-input.component';

type IRHTFormInputProps = {
  name: string;
} & FormInputProps;

const RHFormInput: FC<IRHTFormInputProps> = ({ name, ...other }) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => (
        <FormInput {...field} errorMessage={error?.message} {...other} />
      )}
    />
  );
};

export default RHFormInput;
