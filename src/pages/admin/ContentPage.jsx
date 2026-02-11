import React, { useState, useEffect } from 'react'
import { AdminCard } from '../../components/admin/AdminCard'
import { Save, RefreshCw } from 'lucide-react'

export const ContentPage = () => {
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')
  
    const handleSave = (e) => {
      e.preventDefault()
      setLoading(true)
      setMessage('')
      
      // Simulate save
      setTimeout(() => {
        setLoading(false)
        setMessage('Conteúdo atualizado!')
        setTimeout(() => setMessage(''), 3000)
      }, 1000)
    }
  
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-display text-white mb-2">Editor de Conteúdo</h1>
            <p className="text-white/40">Atualize os textos das seções principais.</p>
          </div>
        </div>
  
        <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Hero Section */}
            <AdminCard title="Seção Hero">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase text-white/40 mb-1">Título Principal</label>
                        <input 
                            defaultValue="Criamos experiências que inspiram" 
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-white/40 mb-1">Subtítulo</label>
                        <textarea 
                            defaultValue="Unimos arte, design e tecnologia para construir experiências digitais que vão além do esperado." 
                            rows={3}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none resize-none" 
                        />
                    </div>
                </div>
            </AdminCard>

            {/* About Section */}
            <AdminCard title="Seção Sobre">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase text-white/40 mb-1">Título</label>
                        <input 
                            defaultValue="A Essência" 
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-white/40 mb-1">Filosofia</label>
                        <textarea 
                            defaultValue="Combinamos estética visual impactante com a precisão da engenharia de software." 
                            rows={3}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none resize-none" 
                        />
                    </div>
                </div>
            </AdminCard>

            {/* Gallery Section */}
            <AdminCard title="Seção Projetos">
                <div className="space-y-4">
                    <div>
                        <label className="block text-xs uppercase text-white/40 mb-1">Título</label>
                        <input 
                            defaultValue="Projetos Selecionados" 
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none" 
                        />
                    </div>
                    <div>
                        <label className="block text-xs uppercase text-white/40 mb-1">Descrição</label>
                        <textarea 
                            defaultValue="Cada projeto é uma jornada. Explore nosso trabalho." 
                            rows={3}
                            className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none resize-none" 
                        />
                    </div>
                </div>
            </AdminCard>

             {/* Action Bar */}
            <div className="fixed bottom-0 right-0 left-0 md:left-64 p-4 border-t border-white/10 bg-[#0d0610]/80 backdrop-blur-md flex items-center justify-between z-40">
                {message && (
                    <span className="text-emerald-400 text-sm font-medium animate-pulse">
                    {message}
                    </span>
                )}
                <div className="ml-auto">
                    <button 
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-medium shadow-lg shadow-rose-500/20 disabled:opacity-50 flex items-center gap-2"
                    >
                    {loading ? <RefreshCw className="animate-spin" size={18} /> : <Save size={18} />}
                    Salvar Conteúdo
                    </button>
                </div>
            </div>
        </form>
      </div>
    )
}
