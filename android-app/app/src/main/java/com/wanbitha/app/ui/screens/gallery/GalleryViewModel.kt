package com.wanbitha.app.ui.screens.gallery

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.wanbitha.app.data.model.ArtSeries
import com.wanbitha.app.data.repository.ArtworkRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class GalleryViewModel @Inject constructor(
    private val repository: ArtworkRepository,
) : ViewModel() {

    private val _uiState = MutableStateFlow(GalleryUiState())
    val uiState: StateFlow<GalleryUiState> = _uiState.asStateFlow()

    init {
        loadArtworks()
    }

    private fun loadArtworks() {
        viewModelScope.launch {
            repository.getAllArtworks().collect { artworks ->
                _uiState.update {
                    it.copy(
                        isLoading = false,
                        allArtworks = artworks,
                        filteredArtworks = artworks,
                    )
                }
            }
        }
    }

    fun onSeriesSelected(series: ArtSeries?) {
        _uiState.update { state ->
            state.copy(
                selectedSeries = series,
                filteredArtworks = if (series == null) {
                    state.allArtworks
                } else {
                    state.allArtworks.filter { it.series == series }
                }
            )
        }
    }
}
