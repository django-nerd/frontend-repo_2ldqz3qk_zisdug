import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../lib/api'

export default function Academy(){
  const [modules, setModules] = useState([])
  const [classes, setClasses] = useState([])
  const [selectedModule, setSelectedModule] = useState('')
  const [form, setForm] = useState({ module_code:'DIA1', title:'Aula inaugural', drive_link:'', description:'' })
  const [player, setPlayer] = useState(null)

  useEffect(()=>{
    apiGet('/academy/list-modules').then(setModules).catch(()=>setModules([]))
  },[])

  useEffect(()=>{
    apiGet('/academy/list-classes', selectedModule ? { module_code: selectedModule } : undefined).then(setClasses).catch(()=>setClasses([]))
  },[selectedModule])

  const submit = async (e) => {
    e.preventDefault()
    const resp = await apiPost('/academy/upload-drive-link', form)
    setForm({ module_code: form.module_code, title:'', drive_link:'', description:'' })
    setSelectedModule(form.module_code)
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-900">Academy</h2>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-xl bg-white/70 backdrop-blur border border-white/40 p-4 space-y-4">
          <div className="flex items-center gap-3">
            <select value={selectedModule} onChange={e=>setSelectedModule(e.target.value)} className="px-3 py-2 rounded-lg border bg-white/80">
              <option value="">Todos os módulos</option>
              {modules.map((m,i)=> <option key={i} value={m.code}>{m.title || m.code}</option>)}
            </select>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {classes.map((c)=> (
              <div key={c._id?.$oid || c._id} className="rounded-lg border bg-white/80 p-3">
                <div className="font-medium text-slate-900">{c.title}</div>
                <div className="text-xs text-slate-600">{c.description}</div>
                <button onClick={()=>setPlayer(c.drive_link)} className="mt-2 text-indigo-600 hover:underline text-sm">Assistir</button>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl bg-white/70 backdrop-blur border border-white/40 p-4">
          <div className="font-medium mb-2">Adicionar aula (link do Drive)</div>
          <form onSubmit={submit} className="space-y-2">
            <input className="w-full px-3 py-2 rounded-lg border bg-white/80" placeholder="Código do módulo (ex: DIA1)" value={form.module_code} onChange={e=>setForm({...form, module_code:e.target.value})} />
            <input className="w-full px-3 py-2 rounded-lg border bg-white/80" placeholder="Título" value={form.title} onChange={e=>setForm({...form, title:e.target.value})} />
            <input className="w-full px-3 py-2 rounded-lg border bg-white/80" placeholder="Descrição" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
            <input className="w-full px-3 py-2 rounded-lg border bg-white/80" placeholder="Link do Google Drive" value={form.drive_link} onChange={e=>setForm({...form, drive_link:e.target.value})} />
            <button className="w-full px-4 py-2 rounded-lg bg-emerald-600 text-white">Salvar</button>
          </form>
        </div>
      </div>

      {player && (
        <div className="rounded-xl bg-white/80 border p-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">Player (Google Drive)</div>
            <button onClick={()=>setPlayer(null)} className="text-sm text-slate-600">Fechar</button>
          </div>
          <div className="mt-3 aspect-video">
            <iframe src={player.replace('view?usp=sharing','preview')} className="w-full h-full rounded-lg" allow="autoplay" allowFullScreen></iframe>
          </div>
        </div>
      )}
    </div>
  )
}
