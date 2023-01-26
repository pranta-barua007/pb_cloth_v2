import { AuthError, AuthErrorCodes } from 'firebase/auth';
import { useDispatch } from 'react-redux';

import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import RHFormInput from '../form-input/rhf-form-input-component';

import Button from '../button/button.component';

import { SignUpContainer } from './sign-up-form.styles';
import { signUpStart } from '../../store/user/user.action';

const validationSchema = z
  .object({
    displayName: z.string().min(4, { message: 'Name Must be 4 characters long!' }),
    email: z.string().email({ message: 'Please Provide a Valid Email' }),
    password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  });

type ValidationSchema = z.infer<typeof validationSchema>;

const SignUpForm = () => {
  const dispatch = useDispatch();

  const methods = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const { reset, handleSubmit } = methods;

  const onSubmit: SubmitHandler<ValidationSchema> = async (data) => {
    try {
      dispatch(signUpStart(data.email, data.password, data.displayName));
      reset({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    } catch (error) {
      if ((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
        reset({
          email: '',
          password: '',
          confirmPassword: '',
        });
        alert('Cannot create user, email already in use');
      } else {
        reset({
          password: '',
          confirmPassword: '',
        });
        console.log('user creation encountered an error', error);
      }
    }
  };

  return (
    <SignUpContainer>
      <h2>Don&apos;t have an account?</h2>
      <span>Sign up with your email and password</span>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RHFormInput name="displayName" label="Display Name" />
          <RHFormInput name="email" label="Email" />
          <RHFormInput name="password" label="Password" type="password" />
          <RHFormInput name="confirmPassword" label="Confirm Password" type="password" />
          <Button type="submit">Sign Up</Button>
        </form>
      </FormProvider>
    </SignUpContainer>
  );
};

export default SignUpForm;
