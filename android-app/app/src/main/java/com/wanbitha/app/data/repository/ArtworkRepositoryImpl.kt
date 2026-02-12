package com.wanbitha.app.data.repository

import com.wanbitha.app.data.model.ArtSeries
import com.wanbitha.app.data.model.ArtistStat
import com.wanbitha.app.data.model.Artwork
import com.wanbitha.app.data.model.ContactMessage
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.flow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class ArtworkRepositoryImpl @Inject constructor() : ArtworkRepository {

    private val artworks = listOf(
        // Série Emoções
        Artwork(
            id = 1,
            title = "Êxtase Cromático",
            description = "Explosão de cores que traduz a euforia em pinceladas vibrantes",
            imageUrl = "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200&q=80",
            thumbnailUrl = "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&q=60",
            series = ArtSeries.EMOTIONS,
        ),
        Artwork(
            id = 2,
            title = "Melancolia Dourada",
            description = "Tons quentes que abraçam a saudade com delicadeza",
            imageUrl = "https://images.unsplash.com/photo-1549490349-8643362247b5?w=1200&q=80",
            thumbnailUrl = "https://images.unsplash.com/photo-1549490349-8643362247b5?w=400&q=60",
            series = ArtSeries.EMOTIONS,
        ),
        Artwork(
            id = 3,
            title = "Fúria Silenciosa",
            description = "O contraste entre o caos interno e a serenidade aparente",
            imageUrl = "https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=1200&q=80",
            thumbnailUrl = "https://images.unsplash.com/photo-1574182245530-967d9b3831af?w=400&q=60",
            series = ArtSeries.EMOTIONS,
        ),
        // Série Texturas
        Artwork(
            id = 4,
            title = "Camadas do Ser",
            description = "Sobreposições que revelam a complexidade da existência",
            imageUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
            thumbnailUrl = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=60",
            series = ArtSeries.TEXTURES,
        ),
        Artwork(
            id = 5,
            title = "Toque Etéreo",
            description = "Matéria e espírito se encontram na superfície da tela",
            imageUrl = "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=1200&q=80",
            thumbnailUrl = "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&q=60",
            series = ArtSeries.TEXTURES,
        ),
        Artwork(
            id = 6,
            title = "Ondulações Profundas",
            description = "Movimento orgânico que convida ao toque visual",
            imageUrl = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&q=80",
            thumbnailUrl = "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=60",
            series = ArtSeries.TEXTURES,
        ),
        // Série Contemporânea
        Artwork(
            id = 7,
            title = "Ruptura",
            description = "A quebra do óbvio através da fusão de técnicas",
            imageUrl = "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&q=80",
            thumbnailUrl = "https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=400&q=60",
            series = ArtSeries.CONTEMPORARY,
        ),
        Artwork(
            id = 8,
            title = "Neon Ancestral",
            description = "Tradição e modernidade colidem em luminescência",
            imageUrl = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=1200&q=80",
            thumbnailUrl = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=400&q=60",
            series = ArtSeries.CONTEMPORARY,
        ),
        Artwork(
            id = 9,
            title = "Horizonte Interior",
            description = "Paisagens internas projetadas no infinito",
            imageUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
            thumbnailUrl = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=60",
            series = ArtSeries.CONTEMPORARY,
        ),
    )

    override fun getAllArtworks(): Flow<List<Artwork>> = flow {
        emit(artworks)
    }

    override fun getArtworksBySeriesGroup(series: ArtSeries): Flow<List<Artwork>> = flow {
        emit(artworks.filter { it.series == series })
    }

    override fun getArtworkById(id: Int): Flow<Artwork?> = flow {
        emit(artworks.find { it.id == id })
    }

    override fun getStats(): List<ArtistStat> = listOf(
        ArtistStat(value = "50+", label = "Obras"),
        ArtistStat(value = "10+", label = "Exposições"),
        ArtistStat(value = "8+", label = "Anos"),
        ArtistStat(value = "3", label = "Séries"),
    )

    override suspend fun sendContactMessage(message: ContactMessage): Result<Unit> {
        return try {
            // Simulate network call
            delay(2000)
            Result.success(Unit)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
