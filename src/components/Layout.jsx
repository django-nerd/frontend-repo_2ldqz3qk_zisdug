import { NavLink, Outlet } from 'react-router-dom'
import { Home, Brain, GraduationCap, Building2, FileText, LogIn } from 'lucide-react'

function NavItem({ to, icon: Icon, label }){
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
          isActive ? 'bg-white/70 text-slate-900' : 'text-slate-600 hover:bg-white/50 hover:text-slate-900'
        }`
      }
    >
      <Icon size={18} />
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  )
}

export default function Layout(){
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="flex">
        <aside className="w-64 hidden md:block p-4 space-y-4">
          <div className="px-2 pt-6">
            <div className="text-2xl font-bold tracking-tight text-slate-900">IB FLIX</div>
            <div className="text-xs text-slate-600">Prático. Profissional. Escalável.</div>
          </div>
          <nav className="space-y-1">
            <NavItem to="/" icon={Home} label="Home" />
            <NavItem to="/intelligence" icon={Brain} label="Intelligence" />
            <NavItem to="/academy" icon={GraduationCap} label="Academy" />
            <NavItem to="/enterprise" icon={Building2} label="Empresarial" />
            <NavItem to="/reports" icon={FileText} label="Relatórios" />
          </nav>
          <div className="pt-6">
            <NavItem to="/auth" icon={LogIn} label="Entrar" />
          </div>
        </aside>
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
