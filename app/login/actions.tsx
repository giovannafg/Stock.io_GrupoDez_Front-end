'use server'

import { cookies } from 'next/headers'

export async function saveToken(token: string) {
  const cookieStore = await cookies()
  cookieStore.set('token', token, { httpOnly: true })
}