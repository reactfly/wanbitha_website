package com.wanbitha.app.ui.screens.gallery

import com.wanbitha.app.data.model.ArtSeries
import com.wanbitha.app.data.model.Artwork

data class GalleryUiState(
    val isLoading: Boolean = true,
    val allArtworks: List<Artwork> = emptyList(),
    val filteredArtworks: List<Artwork> = emptyList(),
    val selectedSeries: ArtSeries? = null, // null = "Todas"
)
