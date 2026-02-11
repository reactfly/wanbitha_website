import React, { useState, useLayoutEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export const InteractiveCard = ({ title, category, id, description, tags }) => {
  const [expanded, setExpanded] = useState(false)
  const cardRef = React.useRef(null)

  const gradients = [
    'from-rose-hot to-rose-bright',
    'from-gold to-rose-rose',
    'from-lavender to-mauve',
    'from-rose-soft to-rose-blush'
  ]
  const gradient = gradients[parseInt(id) - 1] || gradients[0]

  const handleExpand = () => {
    setExpanded(!expanded)
  }

  // Lock body scroll when expanded
  useLayoutEffect(() => {
    if (expanded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [expanded])

  return (
    <>
      {/* ── Card (collapsed state) ── */}
      <motion.div
        ref={cardRef}
        className="w-80 h-96 bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col justify-between cursor-pointer relative overflow-hidden group shadow-xl shadow-black/20 shrink-0"
        whileHover={{
          scale: 1.05,
          boxShadow: '0 25px 50px -12px rgba(233, 30, 123, 0.25)'
        }}
        whileTap={{ scale: 0.97 }}
        onClick={handleExpand}
        layoutId={`card-${id}`}
      >
        {/* Gradient bg on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />

        {/* Corner decoration */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full" />

        {/* Content */}
        <div className="z-10">
          <span className={`inline-block px-3 py-1 rounded-full bg-gradient-to-r ${gradient} text-white font-body text-xs tracking-widest uppercase mb-4`}>
            {id}
          </span>
          <h3 className="text-h3 text-transparent bg-clip-text bg-gradient-to-r from-rose-pale via-white to-rose-pale mb-2">
            {title}
          </h3>
        </div>

        <div className="z-10">
          <p className="text-editorial text-white/60 text-sm mb-4 tracking-wide">{category}</p>
          <div className="flex items-center gap-2 text-rose-hot group-hover:gap-4 transition-all duration-300">
            <span className="text-body-sm">Explorar</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Hover glow */}
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`} />
      </motion.div>

      {/* ── Expanded fullscreen overlay ── */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/80 backdrop-blur-xl"
              onClick={handleExpand}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Expanded card */}
            <motion.div
              className="relative z-10 w-[90vw] max-w-5xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 shadow-2xl shadow-rose-hot/10"
              style={{ background: 'rgba(13, 6, 16, 0.95)' }}
              layoutId={`card-${id}`}
              initial={{
                opacity: 0,
                scale: 0.6,
                y: 40,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: 20,
              }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 25,
              }}
            >
              {/* Header gradient bar */}
              <div className={`h-2 w-full bg-gradient-to-r ${gradient} rounded-t-3xl`} />

              {/* Close button */}
              <button
                onClick={(e) => { e.stopPropagation(); handleExpand() }}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center z-20"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Content */}
              <div className="p-10 md:p-14">
                {/* Badge + category */}
                <motion.div
                  className="flex items-center gap-4 mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${gradient} text-white font-body text-sm tracking-widest uppercase`}>
                    {id}
                  </span>
                  <span className="text-editorial text-white/50 text-sm tracking-wider uppercase">{category}</span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  className="text-h2 text-transparent bg-clip-text bg-gradient-to-r from-rose-pale via-white to-rose-pale mb-8 leading-tight"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  {title}
                </motion.h2>

                {/* Description */}
                <motion.p
                  className="text-editorial text-white/70 leading-relaxed max-w-3xl mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  {description}
                </motion.p>

                {/* Tags */}
                {tags && tags.length > 0 && (
                  <motion.div
                    className="flex flex-wrap gap-3 mb-10"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/60 text-body-sm hover:bg-white/10 hover:text-white transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>
                )}

                {/* Visual divider */}
                <motion.div
                  className={`h-px w-full bg-gradient-to-r ${gradient} opacity-30 mb-10`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                />

                {/* Project details grid */}
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-3 gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  {[
                    { label: 'Tipo', value: category },
                    { label: 'Ano', value: '2024' },
                    { label: 'Status', value: 'Concluído' },
                  ].map((detail, i) => (
                    <div key={i} className="p-5 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-white/40 text-label uppercase tracking-wider mb-2">{detail.label}</div>
                      <div className="text-white text-h4">{detail.value}</div>
                    </div>
                  ))}
                </motion.div>

                {/* CTA */}
                <motion.button
                  className={`mt-10 px-8 py-4 rounded-full bg-gradient-to-r ${gradient} text-white text-h5 hover:scale-105 hover:shadow-2xl hover:shadow-rose-hot/30 transition-all duration-300`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Ver Projeto Completo
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
