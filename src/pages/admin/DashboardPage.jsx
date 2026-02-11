import React from 'react'
import { AdminCard, StatsCard } from '../../components/admin/AdminCard'
import { Users, Eye, Target, Calendar, ArrowRight } from 'lucide-react'

export const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display text-white mb-2">Dashboard</h1>
          <p className="text-white/40">Bem-vindo de volta, Wanessa.</p>
        </div>
        <div className="text-right">
          <p className="text-white/60 text-sm">{new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Total Projetos" 
          value="12" 
          icon={Target} 
          trend={12} 
          trendLabel="vs. mês passado" 
          color="rose"
        />
        <StatsCard 
          title="Visitas Hoje" 
          value="1,240" 
          icon={Eye} 
          trend={8.5} 
          trendLabel="vs. ontem" 
          color="purple"
        />
        <StatsCard 
          title="Mensagens" 
          value="5" 
          icon={Users} 
          trend={-2} 
          trendLabel="novas mensagens" 
          color="amber"
        />
        <StatsCard 
          title="Eventos" 
          value="3" 
          icon={Calendar} 
          trendLabel="próximos 7 dias" 
          color="blue"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart Placeholder — taking 2 cols */}
        <AdminCard title="Atividade Recente" className="lg:col-span-2 min-h-[400px]">
          <div className="h-64 flex items-end gap-2 mt-4">
            {[40, 65, 30, 80, 55, 90, 45, 60, 75, 50, 85, 95].map((h, i) => (
              <div key={i} className="flex-1 bg-white/[0.05] rounded-t-lg hover:bg-rose-500/20 transition-colors relative group" style={{ height: `${h}%` }}>
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {h * 12}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs text-white/30 uppercase tracking-wider">
            <span>Jan</span>
            <span>Fev</span>
            <span>Mar</span>
            <span>Abr</span>
            <span>Mai</span>
            <span>Jun</span>
          </div>
        </AdminCard>

        {/* Recent Actions — taking 1 col */}
        <AdminCard title="Ações Rápidas">
          <div className="space-y-4">
            <button className="w-full text-left p-4 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors flex items-center justify-between group">
              <div>
                <p className="text-sm font-medium text-white group-hover:text-rose-400 transition-colors">Novo Projeto</p>
                <p className="text-xs text-white/40">Adicionar ao portfólio</p>
              </div>
              <ArrowRight size={16} className="text-white/20 group-hover:text-rose-400 group-hover:translate-x-1 transition-all" />
            </button>
            <button className="w-full text-left p-4 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors flex items-center justify-between group">
              <div>
                <p className="text-sm font-medium text-white group-hover:text-purple-400 transition-colors">Editar Perfil</p>
                <p className="text-xs text-white/40">Atualizar bio e foto</p>
              </div>
              <ArrowRight size={16} className="text-white/20 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
            </button>
            <button className="w-full text-left p-4 rounded-lg bg-white/[0.03] hover:bg-white/[0.06] transition-colors flex items-center justify-between group">
              <div>
                <p className="text-sm font-medium text-white group-hover:text-amber-400 transition-colors">Ver Analytics</p>
                <p className="text-xs text-white/40">Relatórios completos</p>
              </div>
              <ArrowRight size={16} className="text-white/20 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
            </button>
          </div>
        </AdminCard>
      </div>
    </div>
  )
}
