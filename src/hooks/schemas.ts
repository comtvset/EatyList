import * as yup from 'yup';

export const schemaSignUp = (t: (key: string) => string) =>
  yup.object().shape({
    name: yup
      .string()
      .required(t('name_required'))
      .min(2, t('name_tooShort'))
      .max(50, t('name_tooLong')),
    email: yup
      .string()
      .required(t('err_emailRequired'))
      .email(t('err_emailInvalid'))
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/, t('err_emailInvalid')),
    confirmEmail: yup
      .string()
      .required(t('err_emailConfirm'))
      .oneOf([yup.ref('email')], t('err_emailMatch')),
    password: yup
      .string()
      .required(t('err_passwordRequired'))
      .min(8, t('err_password>8'))
      .max(32, t('err_password<32'))
      .matches(/[A-Z]/, t('err_passwordContainUpper'))
      .matches(/[a-z]/, t('err_passwordContainLower'))
      .matches(/\d/, t('err_passwordContainNum'))
      .matches(/[@$!%*?&]/, t('err_passwordContainSpecChar')),
    confirmPassword: yup
      .string()
      .required(t('err_passwordConfirm'))
      .oneOf([yup.ref('password')], t('err_passwordMatch')),
  });

export const schemaSignIn = (t: (key: string) => string) =>
  yup.object().shape({
    name: yup.string().nullable(),
    email: yup
      .string()
      .required(t('err_emailRequired'))
      .email(t('err_emailInvalid'))
      .matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,63}$/, t('err_emailInvalid')),
    confirmEmail: yup.string().nullable(),
    password: yup
      .string()
      .required(t('err_passwordRequired'))
      .min(8, t('err_password>8'))
      .max(32, t('err_password<32'))
      .matches(/[A-Z]/, t('err_passwordContainUpper'))
      .matches(/[a-z]/, t('err_passwordContainLower'))
      .matches(/\d/, t('err_passwordContainNum'))
      .matches(/[@$!%*?&]/, t('err_passwordContainSpecChar')),
    confirmPassword: yup.string().nullable(),
  });
