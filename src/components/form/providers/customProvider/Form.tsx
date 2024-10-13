'use client';

import styles from '@/components/form/providers/customProvider/Form.module.scss';
import { usePathname } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { schemaSignIn, schemaSignUp } from '@/hooks/schemas';
import { yupResolver } from '@hookform/resolvers/yup';

export const Form: React.FC = () => {
  const pathname = usePathname();
  const schema = pathname === '/signup' ? schemaSignUp : schemaSignIn;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => data;

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className={`${errors.email ? styles.error : ''}`}>
          Email*
        </label>
        <input
          {...register('email')}
          id="email"
          className={errors.email ? styles.errorBorder : ''}
        />
        <div className={styles.errorContener}>
          <p className={`${styles.errorMassage} ${errors.email ? styles.visible : styles.hidden}`}>
            {errors.email?.message}
          </p>
        </div>

        {pathname === '/signup' && schemaSignUp && (
          <>
            <label htmlFor="confirmEmail" className={`${errors.confirmEmail ? styles.error : ''}`}>
              Confirm email*
            </label>
            <input
              {...register('confirmEmail')}
              id="confirmEmail"
              className={errors.confirmEmail ? styles.errorBorder : ''}
            />
            <div className={styles.errorContener}>
              <p
                className={`${styles.errorMassage} ${errors.confirmEmail ? styles.visible : styles.hidden}`}
              >
                {errors.confirmEmail?.message}
              </p>
            </div>
          </>
        )}

        <label htmlFor="password" className={`${errors.password ? styles.error : ''}`}>
          Choose a password*
        </label>
        <input
          {...register('password')}
          id="password"
          type={'password'}
          className={errors.password ? styles.errorBorder : ''}
        />
        <div className={styles.errorContener}>
          <p
            className={`${styles.errorMassage} ${errors.password ? styles.visible : styles.hidden}`}
          >
            {errors.password?.message}
          </p>
        </div>

        {pathname === '/signup' && (
          <>
            <label
              htmlFor="confirmPassword"
              className={`${errors.confirmPassword ? styles.error : ''}`}
            >
              Confirm password*
            </label>
            <input
              {...register('confirmPassword')}
              id="confirmPassword"
              type={'password'}
              className={errors.confirmPassword ? styles.errorBorder : ''}
            />
            <div className={styles.errorContener}>
              <p
                className={`${styles.errorMassage} ${errors.confirmPassword ? styles.visible : styles.hidden}`}
              >
                {errors.confirmPassword?.message}
              </p>
            </div>
          </>
        )}
        {pathname === '/signup' && (
          <>
            <input type="submit" value={'Sign In'} />
          </>
        )}
        {pathname === '/signin' && (
          <>
            <input type="submit" value={'Log In'} />
          </>
        )}
      </form>
    </>
  );
};
