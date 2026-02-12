# WanBitha — Android App

Aplicativo Android nativo do portfólio artístico de **WanBitha** (Wanessa Alcântara).

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────-──────┐
│                   UI Layer                       │
│  Screens → ViewModels → UiState                  │
│  (Jetpack Compose + Material 3)                  │
├──────────────────────────────────────────-──────┤
│                   DI Layer                       │
│  Hilt Modules → @Binds / @Provides               │
├──────────────────────────────────────────-──────┤
│                  Data Layer                      │
│  Repository Interface ← RepositoryImpl           │
│  Models (Artwork, ArtSeries, ContactMessage)     │
└──────────────────────────────────────────-──────┘
```

### Padrões aplicados:

- **MVVM** com UDF (Unidirectional Data Flow)
- **Clean Architecture** (Data / DI / UI layers)
- **Single Activity** com Navigation Compose
- **Type-Safe Navigation** (Navigation 2.8+ com Kotlin Serialization)
- **StateFlow** para gerenciamento de estado reativo

## 🛠️ Tech Stack

| Tecnologia               | Versão         | Uso                        |
| ------------------------ | -------------- | -------------------------- |
| **Kotlin**               | 2.1.0          | Linguagem principal        |
| **Jetpack Compose**      | BOM 2025.01.01 | UI declarativa             |
| **Material 3**           | via BOM        | Design system              |
| **Navigation Compose**   | 2.8.5          | Navegação type-safe        |
| **Hilt**                 | 2.53           | Injeção de dependência     |
| **Coil 3**               | 3.0.4          | Carregamento de imagens    |
| **KSP**                  | 2.1.0-1.0.29   | Processamento de anotações |
| **Kotlin Serialization** | 1.7.3          | Serialização de rotas      |
| **Coroutines**           | 1.9.0          | Concorrência estruturada   |
| **AGP**                  | 8.7.3          | Build system               |
| **Gradle**               | 8.11.1         | Build tool                 |

## 📱 Telas

| Tela               | Arquivo                  | Descrição                                                        |
| ------------------ | ------------------------ | ---------------------------------------------------------------- |
| **Home**           | `HomeScreen.kt`          | LP completa: Hero, Séries, About, Gallery, Manifesto, Stats, CTA |
| **Gallery**        | `GalleryScreen.kt`       | Grid staggered com filtros por série                             |
| **Artwork Detail** | `ArtworkDetailScreen.kt` | Detalhe com imagem fullwidth e info da série                     |
| **About**          | `AboutScreen.kt`         | Bio, pilares artísticos, manifesto                               |
| **Contact**        | `ContactScreen.kt`       | Formulário com estados de envio/sucesso                          |

## 🎨 Design System

- **Palette**: Rosa Hot, Lavender, Gold, Rose Soft (dark-first)
- **Tipografia**: Bodoni Moda (display) + Inter (body) + Cormorant Garamond (editorial)
- **Glass cards**: Background `#0AFFFFFF`, Border `#14FFFFFF`
- **Gradients**: Brand presets em `BrandGradients`

## ⚙️ Setup

### Pré-requisitos

- Android Studio Ladybug (2024.2+) ou superior
- JDK 17+
- Android SDK 35

### Passo a passo

1. **Abra o Android Studio** e selecione `Open` → navegue até `android-app/`

2. **Adicione as fontes** em `app/src/main/res/font/`:

   ```
   bodoni_moda_regular.ttf
   bodoni_moda_medium.ttf
   bodoni_moda_bold.ttf
   bodoni_moda_italic.ttf
   cormorant_garamond_regular.ttf
   cormorant_garamond_medium.ttf
   cormorant_garamond_semibold.ttf
   cormorant_garamond_italic.ttf
   inter_regular.ttf
   inter_medium.ttf
   inter_semibold.ttf
   inter_bold.ttf
   ```

   > Baixe de [Google Fonts](https://fonts.google.com/)

3. **Sync Gradle** (o Android Studio fará automaticamente)

4. **Run** no emulador ou dispositivo físico

### Se quiser usar fontes padrão temporariamente

Modifique `Type.kt` trocando as `FontFamily` customizadas por `FontFamily.Default`.

## 📂 Estrutura de Pastas

```
app/src/main/java/com/wanbitha/app/
├── WanBithaApp.kt                  # Application (Hilt entry point)
├── MainActivity.kt                 # Single Activity
├── data/
│   ├── model/
│   │   ├── Artwork.kt              # Modelo de obra
│   │   ├── ArtistStat.kt           # Estatística do artista
│   │   └── ContactMessage.kt       # Mensagem de contato
│   └── repository/
│       ├── ArtworkRepository.kt    # Interface do repositório
│       └── ArtworkRepositoryImpl.kt # Implementação (hardcoded → swap p/ API)
├── di/
│   └── AppModule.kt                # Módulo Hilt
└── ui/
    ├── WanBithaAppRoot.kt           # Root Composable
    ├── theme/
    │   ├── Color.kt                 # Paleta de cores
    │   ├── Type.kt                  # Tipografia
    │   ├── Shape.kt                 # Formas
    │   └── Theme.kt                 # Material 3 theme
    ├── navigation/
    │   ├── Screen.kt                # Rotas type-safe
    │   └── NavGraph.kt              # Grafo de navegação
    ├── components/
    │   ├── GradientText.kt          # Texto com gradiente
    │   ├── GlassCard.kt             # Card glassmorphism
    │   ├── AnimatedCounter.kt       # Contador animado
    │   ├── ArtworkCard.kt           # Card de obra
    │   ├── CategoryChip.kt          # Chip de filtro
    │   └── SectionDivider.kt        # Divisor gradiente
    └── screens/
        ├── home/
        │   ├── HomeScreen.kt
        │   ├── HomeUiState.kt
        │   └── HomeViewModel.kt
        ├── gallery/
        │   ├── GalleryScreen.kt
        │   ├── GalleryUiState.kt
        │   └── GalleryViewModel.kt
        ├── artwork/
        │   ├── ArtworkDetailScreen.kt
        │   └── ArtworkDetailViewModel.kt
        ├── about/
        │   └── AboutScreen.kt
        └── contact/
            ├── ContactScreen.kt
            ├── ContactUiState.kt
            └── ContactViewModel.kt
```

## 🚀 Próximos Passos

- [ ] Adicionar fontes TTF em `res/font/`
- [ ] Conectar repositório a uma API real (Supabase, Firebase, etc.)
- [ ] Implementar Room para cache offline
- [ ] Adicionar analytics (Firebase Analytics)
- [ ] Testes unitários (ViewModels) e de UI (Compose Testing)
- [ ] CI/CD com GitHub Actions

---

**© 2026 WanBitha — Wanessa Alcântara**
