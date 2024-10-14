import * as yup from 'yup';

export const schemaSignUp = yup.object().shape({
  email: yup
    .string()
    .required('email is required')
    .email('invalid email address')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/, 'invalid email address'),
  confirmEmail: yup
    .string()
    .required('please confirm email')
    .oneOf([yup.ref('email')], 'emails must match'),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'password must be at least 8 characters')
    .max(32, 'password must be no more than 32 characters')
    .matches(/[A-Z]/, 'password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'password must contain at least one lowercase letter')
    .matches(/\d/, 'password must contain at least one number')
    .matches(/[@$!%*?&]/, 'password must contain at least one special character'),
  confirmPassword: yup
    .string()
    .required('please confirm password')
    .oneOf([yup.ref('password')], 'passwords must match'),
});

export const schemaSignIn = yup.object().shape({
  email: yup
    .string()
    .required('email is required')
    .email('invalid email address')
    .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/, 'invalid email address'),
  confirmEmail: yup.string().nullable(),
  password: yup
    .string()
    .required('password is required')
    .min(8, 'password must be at least 8 characters')
    .max(32, 'password must be no more than 32 characters')
    .matches(/[A-Z]/, 'password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'password must contain at least one lowercase letter')
    .matches(/\d/, 'password must contain at least one number')
    .matches(/[@$!%*?&]/, 'password must contain at least one special character'),
  confirmPassword: yup.string().nullable(),
});
