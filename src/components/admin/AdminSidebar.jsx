import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FolderOpen, 
  MessageSquare, 
  Settings, 
  FileText, 
  BarChart2, 
  LogOut,
  Globe
} from 'lucide-react'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
  { icon: FolderOpen, label: 'Projetos', path: '/admin/projects' },
  { icon: MessageSquare, label: 'Mensagens', path: '/admin/messages' },
  { icon: FileText, label: 'Conteúdo', path: '/admin/content' },
  { icon: BarChart2, label: 'Analytics', path: '/admin/analytics' },
  { icon: Settings, label: 'Configurações', path: '/admin/settings' },
]

export const AdminSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('admin_auth')
    navigate('/admin/login')
  }

  return (
    <aside className="w-64 h-screen fixed left-0 top-0 border-r border-white/10 bg-[#0d0610] flex flex-col z-50">
      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center font-bold text-white">
          WB
        </div>
        <span className="font-display text-lg tracking-wide text-white">Admin</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/50 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon 
                size={20} 
                className={isActive ? 'text-rose-400' : 'text-current group-hover:text-rose-400/80 transition-colors'} 
              />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/5 space-y-2">
        <Link 
          to="/" 
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-white/50 hover:bg-white/5 hover:text-white transition-colors"
        >
          <Globe size={20} />
          <span className="text-sm font-medium">Ver Site</span>
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400/70 hover:bg-red-500/10 hover:text-red-400 transition-colors text-left"
        >
          <LogOut size={20} />
          <span className="text-sm font-medium">Sair</span>
        </button>
      </div>
    </aside>
  )
}
