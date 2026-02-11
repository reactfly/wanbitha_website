import React, { useState, useEffect } from 'react'
import { AdminCard } from '../../components/admin/AdminCard'
import { AdminTable } from '../../components/admin/AdminTable'
import { AdminModal } from '../../components/admin/AdminModal'
import { Plus, Edit2, Trash2, Eye, MoreHorizontal } from 'lucide-react'

export const ProjectsPage = () => {
  const [projects, setProjects] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  
  // Initial dummy data if storage is empty
  useEffect(() => {
    const stored = localStorage.getItem('wb_projects')
    if (stored) {
      setProjects(JSON.parse(stored))
    } else {
      const initial = [
        { id: '1', title: 'Imersão', category: 'WebGL', status: 'published', views: 1240 },
        { id: '2', title: 'Interface', category: 'UI Design', status: 'published', views: 850 },
        { id: '3', title: 'Movimento', category: 'Animation', status: 'draft', views: 0 },
      ]
      setProjects(initial)
      localStorage.setItem('wb_projects', JSON.stringify(initial))
    }
  }, [])

  const handleSave = (e) => {
    e.preventDefault()
    const form = e.target
    const newProject = {
      id: editingProject ? editingProject.id : Date.now().toString(),
      title: form.title.value,
      category: form.category.value,
      status: form.status.value,
      views: editingProject ? editingProject.views : 0,
    }

    let updated
    if (editingProject) {
      updated = projects.map(p => p.id === editingProject.id ? newProject : p)
    } else {
      updated = [...projects, newProject]
    }

    setProjects(updated)
    localStorage.setItem('wb_projects', JSON.stringify(updated))
    setIsModalOpen(false)
    setEditingProject(null)
  }

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
      const updated = projects.filter(p => p.id !== id)
      setProjects(updated)
      localStorage.setItem('wb_projects', JSON.stringify(updated))
    }
  }

  const openModal = (project = null) => {
    setEditingProject(project)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display text-white mb-2">Projetos</h1>
          <p className="text-white/40">Gerencie seu portfólio.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} />
          <span>Novo Projeto</span>
        </button>
      </div>

      <AdminTable 
        headers={['Título', 'Categoria', 'Status', 'Visualizações', 'Ações']}
        data={projects}
        renderRow={(project) => (
          <tr key={project.id} className="hover:bg-white/[0.02] transition-colors">
            <td className="px-6 py-4 font-medium text-white">{project.title}</td>
            <td className="px-6 py-4 text-white/60">{project.category}</td>
            <td className="px-6 py-4">
              <span className={`px-2 py-1 rounded text-xs font-medium ${
                project.status === 'published' 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : 'bg-amber-500/10 text-amber-400'
              }`}>
                {project.status === 'published' ? 'Publicado' : 'Rascunho'}
              </span>
            </td>
            <td className="px-6 py-4 text-white/60">{project.views}</td>
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => openModal(project)}
                  className="p-1.5 hover:bg-white/10 rounded text-white/50 hover:text-white transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={() => handleDelete(project.id)}
                  className="p-1.5 hover:bg-red-500/10 rounded text-white/50 hover:text-red-400 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        )}
      />

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProject ? 'Editar Projeto' : 'Novo Projeto'}
      >
        <form id="projectForm" onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs uppercase text-white/40 mb-1">Título</label>
            <input 
              name="title" 
              defaultValue={editingProject?.title} 
              required
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none" 
            />
          </div>
          <div>
            <label className="block text-xs uppercase text-white/40 mb-1">Categoria</label>
            <select 
              name="category" 
              defaultValue={editingProject?.category || 'WebGL'}
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none"
            >
              <option value="WebGL">WebGL</option>
              <option value="UI Design">UI Design</option>
              <option value="Animation">Animation</option>
              <option value="Branding">Branding</option>
            </select>
          </div>
          <div>
            <label className="block text-xs uppercase text-white/40 mb-1">Status</label>
            <select 
              name="status" 
              defaultValue={editingProject?.status || 'draft'}
              className="w-full bg-black/40 border border-white/10 rounded-lg p-3 text-white focus:border-rose-500/50 outline-none"
            >
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
            </select>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button 
              type="button" 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg hover:bg-white/5 text-white/60 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              className="px-6 py-2 rounded-lg bg-rose-500 hover:bg-rose-600 text-white transition-colors"
            >
              Salvar
            </button>
          </div>
        </form>
      </AdminModal>
    </div>
  )
}
