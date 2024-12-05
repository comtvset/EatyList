import { NextRequest, NextResponse } from 'next/server';
import { admin } from '@/utils/firebaseAdmin';
import { db } from '@/firebase';
import { get, ref } from 'firebase/database';

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

  try {
    const token = req.cookies.get('JWT')?.value;
    if (!token) {
      return NextResponse.json({ token: token || null });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    const userRef = ref(db, `users/${uid}`);
    const snapshot = await get(userRef);
    const userData = snapshot.val();

    return NextResponse.json({ token: decodedToken.uid, user: userData.name });
  } catch (err) {
    console.error('Error in POST:', err);
    const errorMessage = err instanceof Error ? err.message : t_err.unknown_err;
    return NextResponse.json({ token: null, error: errorMessage });
  }
}
