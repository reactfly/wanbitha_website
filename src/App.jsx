import React, { Suspense, useRef, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Canvas } from '@react-three/fiber'
import { Layout } from './components/Layout'
import { LoadingScreen } from './components/LoadingScreen'
import { CustomCursor } from './components/CustomCursor'
import { NoiseOverlay } from './components/NoiseOverlay'
import { PsychedelicTunnelScene } from './components/TunnelScene'
import { TunnelIntro } from './components/TunnelIntro'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { ImmersiveGallery } from './components/ImmersiveGallery'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { TunnelPage } from './pages/TunnelPage'
import { ErrorBoundary } from './components/ErrorBoundary'

// Admin Imports
import { AdminLogin } from './pages/AdminLogin'
import { AdminLayout } from './components/admin/AdminLayout'
import { DashboardPage } from './pages/admin/DashboardPage'
import { ProjectsPage } from './pages/admin/ProjectsPage'
import { MessagesPage } from './pages/admin/MessagesPage'
import { SettingsPage } from './pages/admin/SettingsPage'
import { ContentPage } from './pages/admin/ContentPage'
import { AnalyticsPage } from './pages/admin/AnalyticsPage'

function MainSite() {
  // Shared refs for the 3D scene — no re-renders
  const scrollRef = useRef(0)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = maxScroll > 0 ? window.scrollY / maxScroll : 0
    }
    const onMouseMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div className="relative min-h-screen bg-black text-white antialiased selection:bg-rose-hot selection:text-white overflow-x-hidden cursor-none">
      <CustomCursor />
      <NoiseOverlay />
      <LoadingScreen />

      {/* ═══ Fixed Psychedelic Tunnel Background ═══ */}
      <div className="fixed inset-0 z-0">
        <Suspense fallback={null}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 75 }}
            gl={{ antialias: false, alpha: false }}
            dpr={[1, 1.5]}
          >
            <PsychedelicTunnelScene scrollRef={scrollRef} mouseRef={mouseRef} />
          </Canvas>
        </Suspense>
      </div>

      {/* ═══ Page Content (sits on top of tunnel) ═══ */}
      <Layout>
        <ErrorBoundary>
          <TunnelIntro />
          <Hero />
          <About />
          <ImmersiveGallery />
          <Contact />
          <Footer />
        </ErrorBoundary>
      </Layout>
    </div>
  )
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Main Site Routes */}
        <Route path="/" element={<MainSite />} />
        <Route path="/tunnel" element={<TunnelPage />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="content" element={<ContentPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
