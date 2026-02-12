package com.wanbitha.app.ui.screens.home

import com.wanbitha.app.data.model.ArtSeries
import com.wanbitha.app.data.model.ArtistStat
import com.wanbitha.app.data.model.Artwork

data class HomeUiState(
    val isLoading: Boolean = true,
    val featuredArtworks: List<Artwork> = emptyList(),
    val stats: List<ArtistStat> = emptyList(),
    val series: List<ArtSeries> = ArtSeries.entries,
)
