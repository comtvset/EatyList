import { NextRequest, NextResponse } from 'next/server';
import { admin } from '@/utils/firebaseAdmin';

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
    return NextResponse.json({ token: decodedToken.uid });
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : t_err.unknown_err;
    return NextResponse.json({ token: null, error: errorMessage });
  }
}
