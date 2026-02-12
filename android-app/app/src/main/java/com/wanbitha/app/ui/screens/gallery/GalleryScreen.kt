package com.wanbitha.app.ui.screens.gallery

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.staggeredgrid.LazyVerticalStaggeredGrid
import androidx.compose.foundation.lazy.staggeredgrid.StaggeredGridCells
import androidx.compose.foundation.lazy.staggeredgrid.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.wanbitha.app.R
import com.wanbitha.app.data.model.ArtSeries
import com.wanbitha.app.ui.components.ArtworkCard
import com.wanbitha.app.ui.components.CategoryChip
import com.wanbitha.app.ui.components.GradientText
import com.wanbitha.app.ui.theme.BackgroundDark
import com.wanbitha.app.ui.theme.BrandGradients
import com.wanbitha.app.ui.theme.TextSecondary
import com.wanbitha.app.ui.theme.TextTertiary

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GalleryScreen(
    onNavigateBack: () -> Unit,
    onNavigateToArtwork: (Int) -> Unit,
    viewModel: GalleryViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundDark),
    ) {
        // Top bar
        TopAppBar(
            title = { },
            navigationIcon = {
                IconButton(onClick = onNavigateBack) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                        contentDescription = stringResource(R.string.cd_back),
                        tint = TextSecondary,
                    )
                }
            },
            colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.Transparent),
            modifier = Modifier.statusBarsPadding(),
        )

        // Header
        Column(modifier = Modifier.padding(horizontal = 24.dp)) {
            Text(
                text = stringResource(R.string.gallery_section_label).uppercase(),
                style = MaterialTheme.typography.labelMedium,
                color = TextTertiary,
            )
            Spacer(modifier = Modifier.height(8.dp))
            GradientText(
                text = stringResource(R.string.gallery_title),
                style = MaterialTheme.typography.displaySmall,
                gradient = BrandGradients.fullSpectrum,
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = stringResource(R.string.gallery_subtitle),
                style = MaterialTheme.typography.bodyMedium,
                color = TextTertiary,
            )
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Category filters
        LazyRow(
            contentPadding = PaddingValues(horizontal = 24.dp),
            horizontalArrangement = Arrangement.spacedBy(8.dp),
        ) {
            item {
                CategoryChip(
                    label = stringResource(R.string.gallery_filter_all),
                    isSelected = uiState.selectedSeries == null,
                    onClick = { viewModel.onSeriesSelected(null) },
                )
            }
            items(ArtSeries.entries) { series ->
                CategoryChip(
                    label = series.displayName,
                    isSelected = uiState.selectedSeries == series,
                    onClick = { viewModel.onSeriesSelected(series) },
                )
            }
        }

        Spacer(modifier = Modifier.height(20.dp))

        // Staggered grid
        LazyVerticalStaggeredGrid(
            columns = StaggeredGridCells.Fixed(2),
            contentPadding = PaddingValues(horizontal = 24.dp, vertical = 8.dp),
            horizontalArrangement = Arrangement.spacedBy(12.dp),
            verticalItemSpacing = 12.dp,
            modifier = Modifier.fillMaxSize(),
        ) {
            items(uiState.filteredArtworks, key = { it.id }) { artwork ->
                ArtworkCard(
                    artwork = artwork,
                    onClick = { onNavigateToArtwork(artwork.id) },
                )
            }
        }
    }
}
