import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Intelligence from './pages/Intelligence'
import Academy from './pages/Academy'
import Enterprise from './pages/Enterprise'
import Reports from './pages/Reports'
import Auth from './pages/Auth'

export default function AppRouter(){
  return (
    <Routes>
      <Route element={<Layout />}> 
        <Route path="/" element={<Home />} />
        <Route path="/intelligence" element={<Intelligence />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/enterprise" element={<Enterprise />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/auth" element={<Auth />} />
      </Route>
    </Routes>
  )
}
