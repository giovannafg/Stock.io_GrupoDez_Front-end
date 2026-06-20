'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    fetch('http://localhost:3001/autenticacao/logout', { 
      method: 'POST',
      credentials: 'include' // ← importante pra enviar e receber cookies
    }).then(() => {
      router.push('/')
    })
  }, [])

  return null
}