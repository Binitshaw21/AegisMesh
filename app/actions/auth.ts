'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const role = formData.get('role') as 'admin' | 'officer'
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Mock secure validation
  const isValidAdmin = role === 'admin' && email === 'admin@aegismesh.com' && password === 'admin123'
  const isValidOfficer = role === 'officer' && email === 'officer@aegismesh.com' && password === 'officer123'

  if (!isValidAdmin && !isValidOfficer) {
    return { success: false, error: 'Invalid credentials or unauthorized role.' }
  }

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
