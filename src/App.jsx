import { useEffect, useState } from 'react'
import Spline from '@splinetool/react-spline'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar, CartesianGrid, Legend } from 'recharts'

const perfData = Array.from({ length: 30 }).map((_, i) => ({ day: i + 1, value: Math.round(100 + i * 2 + (Math.sin(i/3) * 10)) }))
const radarData = [
  { metric: 'Vol', A: 60 },
  { metric: 'Sharpe', A: 75 },
  { metric: 'Drawdown', A: 55 },
  { metric: 'Contrib', A: 70 },
  { metric: 'Risco', A: 65 },
]
const barData = [
  { name: 'Finanças', atual: 22, ideal: 18 },
  { name: 'Tech', atual: 28, ideal: 30 },
  { name: 'Saúde', atual: 14, ideal: 16 },
  { name: 'Commodities', atual: 20, ideal: 18 },
  { name: 'Outros', atual: 16, ideal: 18 },
]

function KPI({ label, value, sub }){
  return (
    <div className="rounded-xl bg-white/70 backdrop-blur border border-white/40 p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-2xl font-semibold text-gray-900">{value}</div>
      {sub && <div className="text-xs text-emerald-600 mt-1">{sub}</div>}
    </div>
  )
}

function App() {
  const [insight, setInsight] = useState('')

  useEffect(() => {
    setInsight(
      'Hoje, o desempenho foi guiado por disciplina e diversificação. Reduza ruído, reforce qualidade e mantenha caixa estratégico para assimetria positiva.'
    )
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/60 to-white/70 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-12 space-y-8">
        <header className="flex items-center justify-between">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900">IB FLIX</h1>
          <div className="text-sm text-slate-600">Aprendizado prático + Ferramentas de mercado + Inteligência</div>
        </header>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <KPI label="P&L do dia" value="+R$ 4.250" sub="+0,9%" />
            <KPI label="ROI acumulado" value="+18,2%" sub="YTD" />
            <KPI label="Sharpe" value="1,42" />
            <KPI label="Sortino" value="1,85" />
            <KPI label="Vol Anual" value="22%" />
            <KPI label="DD Máx" value="-12%" />
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-2xl bg-white/70 backdrop-blur border border-white/40 p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-slate-800">Performance histórica</h3>
              <span className="text-xs text-slate-500">30 dias</span>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={perfData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl bg-white/70 backdrop-blur border border-white/40 p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Radar de risco</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis />
                  <Radar dataKey="A" stroke="#0ea5e9" fill="#0ea5e9" fillOpacity={0.4} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-3 gap-6">
          <div className="rounded-2xl bg-white/70 backdrop-blur border border-white/40 p-4 lg:col-span-2">
            <h3 className="font-semibold text-slate-800 mb-2">Alocação atual vs ideal</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="atual" fill="#10b981" />
                  <Bar dataKey="ideal" fill="#6366f1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl bg-white/70 backdrop-blur border border-white/40 p-4">
            <h3 className="font-semibold text-slate-800 mb-2">Insight diário</h3>
            <p className="text-sm text-slate-700 leading-relaxed">
              {insight}
            </p>
          </div>
        </section>

        <footer className="pt-4 text-xs text-slate-500">IB FLIX – disciplina, valor e simplicidade aplicada. </footer>
      </div>
    </div>
  )
}

export default App
