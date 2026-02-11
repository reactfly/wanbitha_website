import React, { useState } from 'react'
import { AdminCard } from '../../components/admin/AdminCard'
import { Save, RefreshCw } from 'lucide-react'

export const SettingsPage = () => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleSave = (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    
    // Simulate save delay
    setTimeout(() => {
      setLoading(false)
      setMessage('Configurações salvas com sucesso!')
      
      // Clear message after 3s
      setTimeout(() => setMessage(''), 3000)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display text-white mb-2">Configurações</h1>
          <p className="text-white/40">Personalize o site globalmente.</p>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Settings */}
          <AdminCard title="Geral">
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-white/40 mb-1">Nome do Site</label>
                <input 
                  defaultValue="WanBitha" 
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-white/40 mb-1">Descrição SEO</label>
                <textarea 
                  defaultValue="Portfolio de arte e design digital." 
                  rows={3}
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none resize-none" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-white/40 mb-1">Email de Contato</label>
                <input 
                  defaultValue="contato@wanbitha.com" 
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none" 
                />
              </div>
            </div>
          </AdminCard>

          {/* Social Media */}
          <AdminCard title="Redes Sociais">
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-white/40 mb-1">Instagram URL</label>
                <input 
                  defaultValue="https://instagram.com/wanbitha" 
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-white/40 mb-1">LinkedIn URL</label>
                <input 
                  defaultValue="https://linkedin.com/in/wanbitha" 
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-white/40 mb-1">WhatsApp Number</label>
                <input 
                  defaultValue="+55 11 99999-9999" 
                  className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none" 
                />
              </div>
            </div>
          </AdminCard>

          {/* Maintenance Mode */}
          <AdminCard title="Status do Site" className="lg:col-span-2">
             <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white font-medium">Modo Manutenção</h4>
                  <p className="text-sm text-white/40">Oculta o site para visitantes e exibe uma tela de "Em breve".</p>
                </div>
                <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="maintenance" id="maintenance" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"/>
                  <label htmlFor="maintenance" className="toggle-label block overflow-hidden h-6 rounded-full bg-white/10 cursor-pointer"></label>
                </div>
             </div>
          </AdminCard>
        </div>

        {/* Action Bar */}
        <div className="fixed bottom-0 right-0 left-0 md:left-64 p-4 border-t border-white/10 bg-[#0d0610]/80 backdrop-blur-md flex items-center justify-between z-40">
           {message && (
             <span className="text-emerald-400 text-sm font-medium animate-pulse">
               {message}
             </span>
           )}
           <div className="ml-auto flex gap-3">
             <button 
               type="button"
               className="px-4 py-2 rounded-lg text-white/40 hover:text-white transition-colors text-sm"
             >
               Descartar
             </button>
             <button 
               type="submit"
               disabled={loading}
               className="px-6 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-lg shadow-rose-500/20 disabled:opacity-50 flex items-center gap-2"
             >
               {loading ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
               Salvar Alterações
             </button>
           </div>
        </div>
      </form>
    </div>
  )
}
