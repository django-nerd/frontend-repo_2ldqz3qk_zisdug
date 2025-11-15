import { useState } from 'react'
import { apiPost } from '../lib/api'

export default function Intelligence(){
  const [tickers, setTickers] = useState('PETR4,VALE3,ITUB4')
  const [loading, setLoading] = useState(false)
  const [recs, setRecs] = useState([])
  const handleRun = async () => {
    try{
      setLoading(true)
      const list = tickers.split(',').map(t => t.trim()).filter(Boolean)
      const resp = await apiPost('/intelligence/recommendations', { user_id: 'demo', tickers: list })
      setRecs(resp)
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold text-slate-900">Intelligence</h2>
      <div className="rounded-xl bg-white/70 backdrop-blur border border-white/40 p-4 space-y-3">
        <label className="text-sm text-slate-700">Tickers (separados por vírgula)</label>
        <input value={tickers} onChange={e=>setTickers(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white/80" />
        <button onClick={handleRun} disabled={loading} className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">{loading ? 'Processando...' : 'Gerar recomendações'}</button>
      </div>
      {recs.length>0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recs.map((r, i)=> (
            <div key={i} className="rounded-xl bg-white/80 border p-4">
              <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">{r.ticker}</div>
                <div className="text-sm px-2 py-0.5 rounded bg-slate-900 text-white">{r.score}</div>
              </div>
              <div className="text-xs text-slate-600 mt-1">Confiança: {r.nivel_confianca}</div>
              <div className="text-sm text-slate-700 mt-2">{r.racional}</div>
              <div className="text-xs text-slate-600 mt-2">Impacto: {r.impacto}</div>
              <ul className="mt-2 list-disc list-inside text-xs text-slate-600">
                {r.fatores_chave?.map((f,idx)=> <li key={idx}>{f}</li>)}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
