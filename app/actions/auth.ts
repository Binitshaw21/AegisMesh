'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(role: 'admin' | 'officer') {
  const cookieStore = await cookies()
  cookieStore.set('auth-session', role, { 
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 // 1 day
  })
  
  if (role === 'admin') {
    redirect('/admin-dashboard')
  } else {
    redirect('/dashboard')
  }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-session')
  redirect('/login')
}
