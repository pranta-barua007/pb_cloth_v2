import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import RHFormInput from '../form-input/rhf-form-input-component';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';
import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

const validationSchema = z.object({
  email: z.string().email({ message: 'Please Provide a Valid Email' }),
  password: z.string().min(6, { message: 'Password must be atleast 6 characters' }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const SignInForm = () => {
  const dispatch = useDispatch();

  const methods = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const { reset, handleSubmit } = methods;

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart());
  };

  const onSubmit: SubmitHandler<ValidationSchema> = (data) => {
    try {
      dispatch(emailSignInStart(data.email, data.password));
      reset({
        email: '',
        password: '',
      });
    } catch (error) {
      console.log('user sign in failed', error);
    }
  };

  return (
    <SignInContainer>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RHFormInput name="email" label="Email" />
          <RHFormInput name="password" label="Password" type="password" />

          <ButtonsContainer>
            <Button type="submit">Sign In</Button>
            <Button
              buttonType={BUTTON_TYPE_CLASSES.google}
              type="button"
              onClick={signInWithGoogle}
            >
              Sign In With Google
            </Button>
          </ButtonsContainer>
        </form>
      </FormProvider>
    </SignInContainer>
  );
};

export default SignInForm;
