import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AdminSidebar } from './AdminSidebar'
import { Menu, X } from 'lucide-react'

export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const isAuthenticated = localStorage.getItem('admin_auth') === 'true'

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-64 shrink-0">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden p-4 border-b border-white/5 flex items-center justify-between bg-[#0d0610]">
          <span className="font-display text-lg">WanBitha Admin</span>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-white/70"
          >
            {sidebarOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-sm" onClick={() => setSidebarOpen(false)}>
            <div className="w-64 h-full" onClick={e => e.stopPropagation()}>
              <AdminSidebar />
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gradient-to-br from-black to-[#0d0610]">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
