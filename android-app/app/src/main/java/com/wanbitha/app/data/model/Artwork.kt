package com.wanbitha.app.data.model

import kotlinx.serialization.Serializable

@Serializable
data class Artwork(
    val id: Int,
    val title: String,
    val description: String,
    val imageUrl: String,
    val thumbnailUrl: String,
    val series: ArtSeries,
)

@Serializable
enum class ArtSeries(val displayName: String, val description: String) {
    EMOTIONS(
        displayName = "Série Emoções",
        description = "Onde as cores ditam o ritmo do sentimento."
    ),
    TEXTURES(
        displayName = "Série Texturas",
        description = "Obras que convidam ao toque visual e à profundidade."
    ),
    CONTEMPORARY(
        displayName = "Série Contemporânea",
        description = "A fusão de técnicas e a quebra do óbvio."
    );
}
