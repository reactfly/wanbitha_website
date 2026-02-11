import React from 'react'

export const AdminCard = ({ children, title, action, className = '' }) => {
  return (
    <div 
      className={`rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm p-6 ${className}`}
    >
      {(title || action) && (
        <div className="flex items-center justify-between mb-6">
          {title && (
            <h3 className="text-lg font-display text-white/90">{title}</h3>
          )}
          {action && (
            <div>{action}</div>
          )}
        </div>
      )}
      {children}
    </div>
  )
}

export const StatsCard = ({ title, value, icon: Icon, trend, trendLabel, color = 'rose' }) => {
  const colors = {
    rose: 'text-rose-400 bg-rose-500/10',
    purple: 'text-purple-400 bg-purple-500/10',
    amber: 'text-amber-400 bg-amber-500/10',
    emerald: 'text-emerald-400 bg-emerald-500/10',
    blue: 'text-blue-400 bg-blue-500/10',
  }

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-white/40 font-medium mb-1">{title}</p>
          <h4 className="text-2xl font-display text-white">{value}</h4>
        </div>
        <div className={`p-2 rounded-lg ${colors[color]}`}>
          <Icon size={20} />
        </div>
      </div>
      {(trend || trendLabel) && (
        <div className="flex items-center gap-2 text-xs">
          {trend && (
            <span className={trend > 0 ? 'text-emerald-400' : 'text-red-400'}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
          <span className="text-white/30">{trendLabel}</span>
        </div>
      )}
    </div>
  )
}
