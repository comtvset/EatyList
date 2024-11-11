'use client';

import styles from '@/components/form/providers/customProvider/Form.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { schemaSignIn, schemaSignUp } from '@/hooks/schemas';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/hooks/useAuth';
import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '@/contexts/alertContext';
export const Form: React.FC = () => {
  const [count, setCount] = useState(0);
  const t = useTranslations('Form');
  const t_err = useTranslations('Errors');
  const pathname = usePathname();
  const schema = pathname === '/signup' ? schemaSignUp(t) : schemaSignIn(t);
  const router = useRouter();

  const { verify, isAuthenticated } = useAuth();
  const { catchAlert } = useContext(AlertContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (userData) => {
    setCount((prev) => prev + 1);
    try {
      const response = await fetch('/api/authenticateEmail', {
        method: 'POST',
        body: JSON.stringify({ userData, pathname }),
      });
      const data = await response.json();

      if (data.redirectUrl && count == 3) {
        router.replace(data.redirectUrl);
      }

      verify();
      if (data.status) {
        catchAlert({ type: 'successful', message: data.message });
      } else {
        catchAlert({ type: 'error', message: data.message });
      }
    } catch (err) {
      if (err instanceof Error) {
        catchAlert({ type: 'error', message: err.name });
      } else {
        catchAlert({ type: 'error', message: t_err('unknown_err') });
      }
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/main');
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className={`${errors.email ? styles.error : ''}`}>
          {t('email')}*
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

        {pathname === '/signup' && schemaSignUp(t) && (
          <>
            <label htmlFor="confirmEmail" className={`${errors.confirmEmail ? styles.error : ''}`}>
              {t('confirmEmail')}*
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
          {t('password')}*
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
              {t('confirmPassword')}*
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
            <input type="submit" className="globalBlueButton" value={t('titleFormSignUp')} />
          </>
        )}
        {pathname === '/signin' && (
          <>
            <input type="submit" className="globalBlueButton" value={t('titleFormSignIn')} />
          </>
        )}
      </form>
    </>
  );
};
