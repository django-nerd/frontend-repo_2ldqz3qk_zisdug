import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../lib/api'

export default function Enterprise(){
  const [orgId, setOrgId] = useState('org-demo')
  const [users, setUsers] = useState([])
  const [form, setForm] = useState({ name:'Novo Usuário', email:'', role:'colaborador' })

  const load = () => apiGet('/enterprise/list-users', { org_id: orgId }).then(setUsers).catch(()=>setUsers([]))

  useEffect(()=>{ load() },[orgId])

  const add = async (e) => {
    e.preventDefault()
    await apiPost('/enterprise/add-user', { org_id: orgId, ...form })
    setForm({ name:'', email:'', role:'colaborador' })
    load()
  }

  const toggle = async (u) => {
    await apiPost('/enterprise/update-permission', { user_id: u._id?.$oid || u._id, role: u.role, is_active: !u.is_active })
    load()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">Empresarial (RBAC)</h2>
      <div className="rounded-xl bg-white/70 backdrop-blur border border-white/40 p-4 grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <input className="px-3 py-2 rounded-lg border bg-white/80" value={orgId} onChange={e=>setOrgId(e.target.value)} />
            <button onClick={load} className="px-3 py-2 rounded-lg bg-slate-900 text-white">Atualizar</button>
          </div>
          <div className="space-y-2">
            {users.map((u)=> (
              <div key={u._id?.$oid || u._id} className="flex items-center justify-between rounded-lg border bg-white/80 p-3">
                <div>
                  <div className="font-medium text-slate-900">{u.name}</div>
                  <div className="text-xs text-slate-600">{u.email} • {u.role}</div>
                </div>
                <button onClick={()=>toggle(u)} className={`px-3 py-1 rounded ${u.is_active? 'bg-emerald-600':'bg-slate-400'} text-white`}>{u.is_active? 'Ativo':'Inativo'}</button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="font-medium mb-2">Adicionar Usuário</div>
          <form onSubmit={add} className="space-y-2">
            <input className="w-full px-3 py-2 rounded-lg border bg-white/80" placeholder="Nome" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
            <input className="w-full px-3 py-2 rounded-lg border bg-white/80" placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} />
            <select className="w-full px-3 py-2 rounded-lg border bg-white/80" value={form.role} onChange={e=>setForm({...form, role:e.target.value})}>
              <option value="colaborador">colaborador</option>
              <option value="analista">analista</option>
              <option value="financeiro">financeiro</option>
              <option value="admin">admin</option>
              <option value="treinamento">treinamento</option>
            </select>
            <button className="w-full px-4 py-2 rounded-lg bg-indigo-600 text-white">Salvar</button>
          </form>
        </div>
      </div>
    </div>
  )
}
