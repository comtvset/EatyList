import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE() {
  cookies().delete('JWT');
  return NextResponse.json({ token: null });
}
