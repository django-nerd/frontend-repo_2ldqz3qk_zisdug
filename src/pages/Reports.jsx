import { useState } from 'react'
import { apiPost } from '../lib/api'

export default function Reports(){
  const [type, setType] = useState('daily')
  const [resp, setResp] = useState(null)

  const generate = async () => {
    const r = await apiPost('/reports/generate', { user_id:'demo', report_type: type })
    setResp(r)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">Relatórios</h2>
      <div className="rounded-xl bg-white/70 backdrop-blur border border-white/40 p-4 space-y-3">
        <div className="flex items-center gap-3">
          <select value={type} onChange={e=>setType(e.target.value)} className="px-3 py-2 rounded-lg border bg-white/80">
            <option value="daily">Diário</option>
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensal</option>
          </select>
          <button onClick={generate} className="px-4 py-2 rounded-lg bg-slate-900 text-white">Gerar</button>
        </div>
        {resp && (
          <div className="rounded-lg border bg-white/80 p-3">
            <div className="font-semibold">{resp.header?.title}</div>
            <pre className="text-xs mt-2 whitespace-pre-wrap">{JSON.stringify(resp.body, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
