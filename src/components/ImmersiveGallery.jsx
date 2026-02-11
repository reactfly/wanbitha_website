import React, { useState, useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

const GalleryItem = ({ image, index, openLightbox }) => (
  <div
    className="group relative overflow-hidden rounded-3xl cursor-pointer border border-white/5 bg-white/5 backdrop-blur-sm"
    onClick={() => openLightbox(index)}
  >
    <div className="aspect-[4/5] overflow-hidden">
        <img
        src={image.thumbnail}
        alt={image.title}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
        />
    </div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Content */}
    <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <span className="text-xs tracking-widest text-white/50 mb-2 block uppercase">
        {image.category}
        </span>
        <h3 className="text-2xl font-display text-white mb-2">{image.title}</h3>
        <p className="text-sm text-white/60 line-clamp-2 leading-relaxed">{image.description}</p>
    </div>

    {/* Zoom icon */}
    <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-75 group-hover:scale-100 hover:bg-white/20">
        <ZoomIn className="w-5 h-5 text-white" />
    </div>
  </div>
)

export const ImmersiveGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const lightboxRef = useRef(null)
  const imageRef = useRef(null)

  // Sample gallery images with metadata
  const galleryImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=60',
      title: 'Abstract Flow',
      category: 'Digital Art',
      description: 'Explorando formas fluidas em espaço digital'
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=60',
      title: 'Neon Dreams',
      category: 'Photography',
      description: 'Luzes neon em ambiente urbano'
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=60',
      title: 'Gradient Waves',
      category: 'Abstract',
      description: 'Ondas de cor em movimento'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&q=60',
      title: 'Purple Haze',
      category: 'Digital Art',
      description: 'Atmosfera misteriosa em tons roxos'
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&q=60',
      title: 'Rose Gold',
      category: 'Photography',
      description: 'Elegância em rosa dourado'
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&q=60',
      title: 'Crystal Clear',
      category: 'Abstract',
      description: 'Refrações de luz em cristal'
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=60',
      title: 'Portrait Study',
      category: 'Photography',
      description: 'Retrato em iluminação dramática'
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=400&q=60',
      title: 'Floral Dreams',
      category: 'Nature',
      description: 'Flores em composição artística'
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=60',
      title: 'Mountain Mist',
      category: 'Landscape',
      description: 'Montanhas envoltas em névoa'
    }
  ]

  // Open lightbox
  const openLightbox = useCallback((index) => {
    setCurrentIndex(index)
    setSelectedImage(galleryImages[index])
    setIsZoomed(false)
    document.body.style.overflow = 'hidden'
  }, [])

  // Close lightbox
  const closeLightbox = useCallback(() => {
    setSelectedImage(null)
    setIsZoomed(false)
    document.body.style.overflow = ''
  }, [])

  // Navigate to next image
  const nextImage = useCallback(() => {
    const newIndex = (currentIndex + 1) % galleryImages.length
    setCurrentIndex(newIndex)
    setSelectedImage(galleryImages[newIndex])
    setIsZoomed(false)
  }, [currentIndex])

  // Navigate to previous image
  const prevImage = useCallback(() => {
    const newIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length
    setCurrentIndex(newIndex)
    setSelectedImage(galleryImages[newIndex])
    setIsZoomed(false)
  }, [currentIndex])

  // Toggle zoom
  const toggleZoom = useCallback(() => {
    setIsZoomed(!isZoomed)
  }, [isZoomed])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return

      switch (e.key) {
        case 'Escape':
          closeLightbox()
          break
        case 'ArrowRight':
          nextImage()
          break
        case 'ArrowLeft':
          prevImage()
          break
        case '+':
        case '=':
          if (!isZoomed) setIsZoomed(true)
          break
        case '-':
          if (isZoomed) setIsZoomed(false)
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage, nextImage, prevImage, closeLightbox, isZoomed])

  // Animate lightbox entry
  useEffect(() => {
    if (selectedImage && lightboxRef.current) {
      gsap.fromTo(lightboxRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      )
    }
  }, [selectedImage])

  return (
    <section id="galeria" className="section">
      {/* Glass overlay */}
      <div className="overlay-gradient" />

      {/* Ambient light */}
      <div className="ambient-light">
        <div className="ambient-orb absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5" />
        <div className="ambient-orb absolute bottom-1/3 right-1/4 w-80 h-80 bg-rose-hot/5" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="section-header">
          <span className="section-label">Galeria</span>
          <h2 className="text-h2 mb-4" style={{
            background: 'linear-gradient(135deg, #f9a8d4, #ffffff, #c084fc)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'gradientMove 5s ease infinite',
          }}>
            Momentos
          </h2>
          <h3 className="text-h3 mb-6">
            <span style={{
              background: 'linear-gradient(135deg, #c084fc, #fbbf24, #f472c4)',
              backgroundSize: '200% 200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradientMove 5s ease infinite',
            }}>
              Wanessa Bitha
            </span>
          </h3>
          <p className="text-editorial max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.6)' }}>
            Uma coleção curada de experiências visuais que inspiram e encantam.
          </p>
        </div>

        {/* Masonry grid with Parallax */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
           {/* Column 1 */}
           <div className="space-y-8 mt-0 lg:mt-0">
              {galleryImages.filter((_, i) => i % 3 === 0).map((image, index) => (
                 <GalleryItem key={image.id} image={image} index={index * 3} openLightbox={openLightbox} />
              ))}
           </div>
           
           {/* Column 2 - Offset */}
           <div className="space-y-8 mt-0 lg:mt-20">
              {galleryImages.filter((_, i) => i % 3 === 1).map((image, index) => (
                 <GalleryItem key={image.id} image={image} index={index * 3 + 1} openLightbox={openLightbox} />
              ))}
           </div>

           {/* Column 3 */}
           <div className="space-y-8 mt-0 lg:mt-0">
              {galleryImages.filter((_, i) => i % 3 === 2).map((image, index) => (
                 <GalleryItem key={image.id} image={image} index={index * 3 + 2} openLightbox={openLightbox} />
              ))}
           </div>
        </div>

        {/* Gallery info */}
        <div className="mt-16 text-center">
          <p className="text-body-xs text-faint">
            {galleryImages.length} imagens • Clique para expandir • Use as setas para navegar
          </p>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 z-10"
            onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
          >
            <X className="w-6 h-6 text-white" />
          </button>

          {/* Navigation buttons */}
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 z-10"
            onClick={(e) => { e.stopPropagation(); prevImage(); }}
          >
            <ChevronLeft className="w-7 h-7 text-white" />
          </button>

          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 z-10"
            onClick={(e) => { e.stopPropagation(); nextImage(); }}
          >
            <ChevronRight className="w-7 h-7 text-white" />
          </button>

          {/* Zoom button */}
          <button
            className="absolute bottom-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 z-10"
            onClick={(e) => { e.stopPropagation(); toggleZoom(); }}
          >
            {isZoomed ? <ZoomOut className="w-6 h-6 text-white" /> : <ZoomIn className="w-6 h-6 text-white" />}
          </button>

          {/* Image container */}
          <div
            ref={imageRef}
            className={`relative max-w-[90vw] max-h-[85vh] transition-transform duration-500 ${isZoomed ? 'scale-150' : 'scale-100'}`}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.title}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
            />

            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <span className="text-label text-rose-soft mb-2 block">
                {selectedImage.category}
              </span>
              <h3 className="text-h4 text-white mb-1">{selectedImage.title}</h3>
              <p className="text-body-sm text-secondary">{selectedImage.description}</p>
            </div>
          </div>

          {/* Counter */}
          <div className="absolute bottom-6 left-6 text-body-sm text-faint">
            {currentIndex + 1} / {galleryImages.length}
          </div>

          {/* Thumbnails strip */}
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 max-w-[80vw] overflow-x-auto hide-scrollbar">
            {galleryImages.map((img, idx) => (
              <button
                key={img.id}
                className={`w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-300 ${
                  idx === currentIndex ? 'ring-2 ring-rose-hot scale-110' : 'opacity-50 hover:opacity-100'
                }`}
                onClick={(e) => { e.stopPropagation(); setCurrentIndex(idx); setSelectedImage(img); setIsZoomed(false); }}
              >
                <img
                  src={img.thumbnail}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
