import { NextRequest, NextResponse } from 'next/server';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '@/firebase';
import { ref, set, update } from 'firebase/database';

const loadTranslations = async (lang: string) => {
  try {
    return await import(`../../../i18n/messages/${lang}.json`);
  } catch {
    return await import('../../../i18n/messages/en.json');
  }
};

export async function POST(req: NextRequest) {
  const lang = req.cookies.get('NEXT_LOCALE')?.value || 'en';
  const translations = await loadTranslations(lang);
  const t_err = translations.Errors;

  const data = await req.json();

  let userCredential;
  try {
    if (data.pathname === '/signin') {
      userCredential = await signInWithEmailAndPassword(
        auth,
        data.userData.email,
        data.userData.password,
      );

      await update(ref(db, 'users/' + userCredential.user.uid), {
        lastSignInTime: userCredential.user.metadata.lastSignInTime,
      });
    }
    if (data.pathname === '/signup') {
      userCredential = await createUserWithEmailAndPassword(
        auth,
        data.userData.email,
        data.userData.password,
      );

      set(ref(db, 'users/' + userCredential.user.uid), {
        name: data.userData.name,
        email: userCredential.user.email,
        creationTime: userCredential.user.metadata.creationTime,
        lastSignInTime: userCredential.user.metadata.lastSignInTime,
      });
    }
    if (userCredential) {
      const user = userCredential.user;
      const accessToken = await user.getIdToken();
      const response = NextResponse.json({ status: 200, message: t_err['auth_success'] });

      response.cookies.set('JWT', accessToken, {
        maxAge: 3600,
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'strict',
      });
      return response;
    }
  } catch (err) {
    const errorCode = (err as { code: string }).code;

    const errorMessage = t_err[errorCode] || t_err['unknown_err'];
    return NextResponse.json({ message: errorMessage, redirectUrl: '/signup' });
  }
}
