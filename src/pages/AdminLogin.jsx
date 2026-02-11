import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, ArrowRight, Loader2 } from 'lucide-react'

export const AdminLogin = () => {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Simulate network delay
    setTimeout(() => {
      // In a real app, hash checking would happen backend-side
      // or at least using a secure hash comparison.
      // For this portfolio demo, checking string equality is sufficient.
      if (password === 'wanbitha2026') {
        localStorage.setItem('admin_auth', 'true')
        navigate('/admin/dashboard')
      } else {
        setError('Senha incorreta. Tente novamente.')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-rose-500 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-rose-900/20">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-display text-white mb-2">Acesso Restrito</h1>
          <p className="text-white/40">Digite a chave de acesso para continuar.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6 bg-white/[0.02] border border-white/5 p-8 rounded-2xl backdrop-blur-xl">
          <div>
            <label className="block text-xs uppercase tracking-wider text-white/40 mb-2">Chave de Acesso</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-lg focus:outline-none focus:border-rose-500/50 transition-colors placeholder:text-white/10"
              placeholder="••••••••••••"
              autoFocus
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 p-3 rounded-lg flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Entrar no Painel'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
        
        <p className="text-center mt-8 text-white/20 text-xs">
          Sistema Seguro WanBitha v2.0
        </p>
      </div>
    </div>
  )
}
