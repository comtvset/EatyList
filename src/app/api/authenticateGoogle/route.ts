import { NextRequest, NextResponse } from 'next/server';

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

  const { idToken } = await req.json();

  if (!idToken) {
    return NextResponse.json({ error: t_err['unknown_err'] }, { status: 400 });
  }

  const response = NextResponse.json({ message: t_err['auth_success'] });
  response.cookies.set('JWT', idToken, {
    httpOnly: true,
    secure: true,
    path: '/',
    sameSite: 'strict',
  });

  return response;
}
