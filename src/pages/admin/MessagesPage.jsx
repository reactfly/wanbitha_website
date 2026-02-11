import React, { useState, useEffect } from 'react'
import { AdminTable } from '../../components/admin/AdminTable'
import { MessageSquare, Calendar, Mail, CheckCircle, Trash2 } from 'lucide-react'

export const MessagesPage = () => {
  const [messages, setMessages] = useState([])

  // Mock initial messages
  useEffect(() => {
    const stored = localStorage.getItem('wb_messages')
    if (stored) {
      setMessages(JSON.parse(stored))
    } else {
      const initial = [
        { id: 1, name: 'João Silva', email: 'joao@exemplo.com', subject: 'Orçamento Site', message: 'Gostaria de um orçamento para um e-commerce...', date: '2026-02-10', status: 'unread' },
        { id: 2, name: 'Maria Souza', email: 'maria@design.com', subject: 'Parceria', message: 'Olá, sou designer e gostaria de propor...', date: '2026-02-09', status: 'read' },
        { id: 3, name: 'Pedro Santos', email: 'pedro@tech.br', subject: 'Dúvida WebGL', message: 'Vi o portfólio de vocês e fiquei impressionado...', date: '2026-02-08', status: 'read' },
      ]
      setMessages(initial)
      localStorage.setItem('wb_messages', JSON.stringify(initial))
    }
  }, [])

  const markAsRead = (id) => {
    const updated = messages.map(m => m.id === id ? { ...m, status: 'read' } : m)
    setMessages(updated)
    localStorage.setItem('wb_messages', JSON.stringify(updated))
  }

  const deleteMessage = (id) => {
    if (window.confirm('Excluir esta mensagem?')) {
      const updated = messages.filter(m => m.id !== id)
      setMessages(updated)
      localStorage.setItem('wb_messages', JSON.stringify(updated))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display text-white mb-2">Mensagens</h1>
          <p className="text-white/40">Caixa de entrada de contatos.</p>
        </div>
        <div className="bg-white/5 px-4 py-2 rounded-lg text-white/60 text-sm">
          {messages.filter(m => m.status === 'unread').length} não lidas
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1 space-y-4">
          {messages.map((msg) => (
            <div 
              key={msg.id}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                msg.status === 'unread' 
                  ? 'bg-rose-500/10 border-rose-500/30 hover:border-rose-500/50' 
                  : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className={`font-medium ${msg.status === 'unread' ? 'text-white' : 'text-white/60'}`}>
                  {msg.name}
                </h4>
                <span className="text-xs text-white/30">{msg.date}</span>
              </div>
              <p className="text-sm text-white/80 font-medium mb-1 truncate">{msg.subject}</p>
              <p className="text-xs text-white/40 line-clamp-2">{msg.message}</p>
              
              <div className="flex justify-end gap-2 mt-3 pt-3 border-t border-white/5">
                {msg.status === 'unread' && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); markAsRead(msg.id) }}
                    className="p-1.5 hover:bg-emerald-500/20 text-emerald-400 rounded transition-colors"
                    title="Marcar como lida"
                  >
                    <CheckCircle size={14} />
                  </button>
                )}
                <button 
                  onClick={(e) => { e.stopPropagation(); deleteMessage(msg.id) }}
                  className="p-1.5 hover:bg-red-500/20 text-red-400 rounded transition-colors"
                  title="Excluir"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Message Detail Placeholder (Expandable in future) */}
        <div className="lg:col-span-2 hidden lg:flex items-center justify-center p-12 rounded-xl border border-white/5 bg-white/[0.01] text-white/20 flex-col gap-4">
          <MessageSquare size={48} />
          <p>Selecione uma mensagem para ler o conteúdo completo</p>
        </div>
      </div>
    </div>
  )
}
