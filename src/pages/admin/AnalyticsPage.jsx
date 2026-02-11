import React from 'react'
import { StatsCard, AdminCard } from '../../components/admin/AdminCard'
import { BarChart2, TrendingUp, Users, Smartphone, Globe, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react'

export const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display text-white mb-2">Analytics</h1>
          <p className="text-white/40">Métricas de performance e audiência.</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Sessões Totais" 
          value="12.5k" 
          icon={BarChart2} 
          trend={15} 
          trendLabel="vs. mês passado" 
          color="blue"
        />
        <StatsCard 
          title="Taxa de Rejeição" 
          value="42%" 
          icon={TrendingUp} 
          trend={-5} 
          trendLabel="melhoria" 
          color="emerald"
        />
        <StatsCard 
          title="Tempo Médio" 
          value="3m 45s" 
          icon={Clock} 
          trend={12} 
          trendLabel="engajamento up" 
          color="purple"
        />
         <StatsCard 
          title="Visitantes Únicos" 
          value="8.2k" 
          icon={Users} 
          trend={8} 
          trendLabel="novos usuários" 
          color="rose"
        />
      </div>

      {/* Traffic Sources & Device Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Traffic Source - Custom Bar implementation */}
        <AdminCard title="Origem de Tráfego" className="h-[300px]">
           <div className="space-y-6 mt-4">
              {[
                  { label: 'Google Search', val: 45, color: 'bg-rose-500' },
                  { label: 'Direct', val: 30, color: 'bg-purple-500' },
                  { label: 'Social Media', val: 15, color: 'bg-amber-500' },
                  { label: 'Referral', val: 10, color: 'bg-emerald-500' }
              ].map((item, i) => (
                  <div key={i}>
                      <div className="flex justify-between text-sm text-white/60 mb-2">
                          <span>{item.label}</span>
                          <span>{item.val}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                          <div 
                              className={`h-full ${item.color} rounded-full transition-all duration-1000 ease-out`} 
                              style={{ width: `${item.val}%` }} 
                          />
                      </div>
                  </div>
              ))}
           </div>
        </AdminCard>

        {/* Devices */}
        <AdminCard title="Dispositivos" className="h-[300px]">
          <div className="h-full flex items-center justify-around pb-8">
            <div className="text-center group">
               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-400 group-hover:scale-110 transition-transform duration-300">
                  <Smartphone size={32} />
               </div>
               <div className="flex items-center justify-center gap-1 mb-1">
                  <h4 className="text-3xl font-display text-white">65%</h4>
                  <ArrowUpRight size={16} className="text-emerald-400" />
               </div>
               <p className="text-xs uppercase tracking-wider text-white/40">Mobile</p>
            </div>
            
            <div className="h-24 w-px bg-white/10" />

            <div className="text-center group">
               <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  <Globe size={32} />
               </div>
               <div className="flex items-center justify-center gap-1 mb-1">
                  <h4 className="text-3xl font-display text-white">35%</h4>
                  <ArrowDownRight size={16} className="text-red-400" />
               </div>
               <p className="text-xs uppercase tracking-wider text-white/40">Desktop</p>
            </div>
          </div>
        </AdminCard>
      </div>

      {/* Pages Table */}
      <AdminCard title="Páginas Mais Visitadas">
          <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                  <thead>
                      <tr className="border-b border-white/5 text-white/40 uppercase text-xs tracking-wider">
                          <th className="px-4 py-3 font-medium">Página</th>
                          <th className="px-4 py-3 font-medium">Visitas</th>
                          <th className="px-4 py-3 font-medium">Tempo Médio</th>
                          <th className="px-4 py-3 font-medium">Bounce Rate</th>
                      </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                      {[
                          { page: '/', visits: '5,240', time: '1m 20s', bounce: '45%' },
                          { page: '/projetos', visits: '3,150', time: '2m 15s', bounce: '32%' },
                          { page: '/sobre', visits: '1,890', time: '1m 45s', bounce: '38%' },
                          { page: '/contato', visits: '950', time: '0m 50s', bounce: '55%' },
                      ].map((row, i) => (
                          <tr key={i} className="hover:bg-white/5 transition-colors">
                              <td className="px-4 py-3 font-medium text-white">{row.page}</td>
                              <td className="px-4 py-3 text-white/60">{row.visits}</td>
                              <td className="px-4 py-3 text-white/60">{row.time}</td>
                              <td className="px-4 py-3 text-emerald-400">{row.bounce}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </AdminCard>
    </div>
  )
}
