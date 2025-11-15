import { useState } from 'react'

export default function Auth(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = (e) => {
    e.preventDefault()
    alert('Autenticação demo — em breve: JWT + RBAC')
  }

  return (
    <div className="max-w-md mx-auto rounded-xl bg-white/70 backdrop-blur border border-white/40 p-6 space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">Entrar</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full px-3 py-2 rounded-lg border bg-white/80" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full px-3 py-2 rounded-lg border bg-white/80" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white">Entrar</button>
      </form>
    </div>
  )
}
