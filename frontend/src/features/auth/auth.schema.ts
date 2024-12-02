import * as Yup from 'yup';

export const signinSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export const signupSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  budgetLimit: Yup.number()
    .typeError('Budget limit must be a number')
    .required('Budget limit is required')
    .positive('Budget limit must be a positive number'),
});

export const forgotPasswordSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
});

export const resetPasswordSchema = Yup.object({
  newPassword: Yup.string().required('Password is required'),
});
