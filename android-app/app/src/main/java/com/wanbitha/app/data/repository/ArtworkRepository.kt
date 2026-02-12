package com.wanbitha.app.data.repository

import com.wanbitha.app.data.model.ArtSeries
import com.wanbitha.app.data.model.ArtistStat
import com.wanbitha.app.data.model.Artwork
import com.wanbitha.app.data.model.ContactMessage
import kotlinx.coroutines.flow.Flow

interface ArtworkRepository {
    fun getAllArtworks(): Flow<List<Artwork>>
    fun getArtworksBySeriesGroup(series: ArtSeries): Flow<List<Artwork>>
    fun getArtworkById(id: Int): Flow<Artwork?>
    fun getStats(): List<ArtistStat>
    suspend fun sendContactMessage(message: ContactMessage): Result<Unit>
}
