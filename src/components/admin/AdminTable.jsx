import React from 'react'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

export const AdminTable = ({ 
  headers, 
  data, 
  renderRow, 
  onSearch, 
  actions,
  searchPlaceholder = 'Buscar...'
}) => {
  return (
    <div className="w-full">
      {/* Table Header / Toolbar */}
      <div className="flex items-center justify-between mb-4 gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input 
            type="text" 
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-rose-500/50 transition-colors"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="w-full overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              {headers.map((header, i) => (
                <th key={i} className="px-6 py-4 font-medium text-white/50">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {data.length > 0 ? (
              data.map((item, i) => renderRow(item, i))
            ) : (
              <tr>
                <td colSpan={headers.length} className="px-6 py-12 text-center text-white/30">
                  Nenhum registro encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination (Visual only for now) */}
      <div className="flex items-center justify-between mt-4 px-2">
        <span className="text-xs text-white/40">
          Mostrando {data.length} registros
        </span>
        <div className="flex items-center gap-1">
          <button disabled className="p-1 rounded hover:bg-white/5 text-white/30 disabled:opacity-50">
            <ChevronLeft size={18} />
          </button>
          <button disabled className="p-1 rounded hover:bg-white/5 text-white/30 disabled:opacity-50">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
