package com.wanbitha.app.ui.screens.artwork

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.wanbitha.app.data.model.Artwork
import com.wanbitha.app.data.repository.ArtworkRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ArtworkDetailViewModel @Inject constructor(
    private val repository: ArtworkRepository,
) : ViewModel() {

    private val _artwork = MutableStateFlow<Artwork?>(null)
    val artwork: StateFlow<Artwork?> = _artwork.asStateFlow()

    fun loadArtwork(id: Int) {
        viewModelScope.launch {
            repository.getArtworkById(id).collect { art ->
                _artwork.value = art
            }
        }
    }
}
