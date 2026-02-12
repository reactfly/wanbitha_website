# React Scroll-Bound Video Component (Framer Motion)

Este componente implementa "Scrollytelling" com vídeo, sincronizando o `currentTime` do vídeo com a posição do scroll da página.

## Tecnologias

- **React**: Gerenciamento de estado e refs.
- **Framer Motion**: Hooks `useScroll`, `useTransform` e `useSpring` para física suave.

## Componente (`ScrollyVideo.jsx`)

```jsx
import React, { useRef, useEffect, useState } from "react";
import { useScroll, useSpring, motion } from "framer-motion";

/**
 * ScrollyVideo Component
 *
 * Video de fundo fixo que avança/retrocede com o scroll da página.
 *
 * @param {string} src - URL do vídeo (MP4 recomendado)
 * @param {string} scrollHeight - Altura total de scroll (ex: '400vh')
 */
const ScrollyVideo = ({ src, scrollHeight = "400vh" }) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [duration, setDuration] = useState(0);

  // 1. Captura o progresso do scroll no container (0 a 1)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"], // Começa no topo, termina no fundo
  });

  // 2. Adiciona física de mola (Spring) para suavizar o movimento
  // Isso evita que o vídeo trave ou pule frames em scrolls rápidos
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 20, // "Peso" da parada (quanto maior, menos oscila)
    stiffness: 100, // "Rigidez" da mola
    mass: 0.5, // Leveza
    restDelta: 0.001, // Precisão de parada
  });

  // 3. Sincroniza o tempo do vídeo frame-a-frame
  useEffect(() => {
    // Escuta mudanças no valor suavizado (motion value)
    const unsubscribe = smoothProgress.on("change", (latest) => {
      if (videoRef.current && duration > 0) {
        // Mapeia o progresso (0-1) para a duração do vide (0-duration)
        const targetTime = latest * duration;

        // Verifica se o tempo é válido
        if (Number.isFinite(targetTime)) {
          // Atualiza a posição do vídeo
          // Nota: 'fastSeek' é mais performático se disponível, mas nem todos browsers suportam
          if (videoRef.current.fastSeek) {
            videoRef.current.fastSeek(targetTime);
          } else {
            videoRef.current.currentTime = targetTime;
          }
        }
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, duration]);

  // Handler para garantir que o vídeo está pronto
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  return (
    <section
      ref={containerRef}
      style={{
        height: scrollHeight, // Define o "comprimento" da timeline no scroll
        position: "relative",
      }}
    >
      {/* Wrapper Fixo para o Vídeo */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: -1,
          overflow: "hidden",
          backgroundColor: "#000", // Fallback color
        }}
      >
        <motion.video
          ref={videoRef}
          src={src}
          onLoadedMetadata={handleLoadedMetadata}
          muted
          playsInline
          preload="auto"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.6, // Ajuste estético
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
      </div>

      {/* Conteúdo sobreposto (Opcional) */}
      <div style={{ position: "relative", zIndex: 10, padding: "2rem" }}>
        <h1 style={{ color: "white", mixBlendMode: "difference" }}>
          Scrollytelling Experience
        </h1>
        <p style={{ color: "white", marginTop: "50vh" }}>
          Continue rolando para avançar a história...
        </p>
      </div>
    </section>
  );
};

export default ScrollyVideo;
```

## Como Integrar (Next.js / React App)

1. Instale as dependências:

   ```bash
   npm install framer-motion
   ```

2. Importe e use:

   ```jsx
   import ScrollyVideo from "./components/ScrollyVideo";

   export default function Page() {
     return (
       <main>
         <ScrollyVideo src="/assets/video-background.mp4" />
       </main>
     );
   }
   ```
