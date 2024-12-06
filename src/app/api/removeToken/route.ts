import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function DELETE() {
  (await cookies()).delete('JWT');
  return NextResponse.json({ token: null });
}
