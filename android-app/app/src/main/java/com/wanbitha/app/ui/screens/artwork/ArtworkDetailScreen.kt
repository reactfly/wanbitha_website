package com.wanbitha.app.ui.screens.artwork

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
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
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import coil3.compose.AsyncImage
import com.wanbitha.app.R
import com.wanbitha.app.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ArtworkDetailScreen(
    artworkId: Int,
    onNavigateBack: () -> Unit,
    viewModel: ArtworkDetailViewModel = hiltViewModel(),
) {
    LaunchedEffect(artworkId) {
        viewModel.loadArtwork(artworkId)
    }

    val artwork by viewModel.artwork.collectAsStateWithLifecycle()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundDark)
            .verticalScroll(rememberScrollState()),
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

        artwork?.let { art ->
            // Full-width image
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp)
                    .clip(MaterialTheme.shapes.extraLarge),
            ) {
                AsyncImage(
                    model = art.imageUrl,
                    contentDescription = art.title,
                    contentScale = ContentScale.FillWidth,
                    modifier = Modifier.fillMaxWidth(),
                )

                // Bottom gradient
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(120.dp)
                        .align(androidx.compose.ui.Alignment.BottomCenter)
                        .background(
                            Brush.verticalGradient(
                                colors = listOf(Color.Transparent, BackgroundDark.copy(alpha = 0.8f))
                            )
                        ),
                )
            }

            Spacer(modifier = Modifier.height(24.dp))

            // Info
            Column(modifier = Modifier.padding(horizontal = 24.dp)) {
                Text(
                    text = art.series.displayName.uppercase(),
                    style = MaterialTheme.typography.labelMedium,
                    color = RoseHot.copy(alpha = 0.8f),
                )
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = art.title,
                    style = MaterialTheme.typography.displaySmall,
                    color = TextPrimary,
                )
                Spacer(modifier = Modifier.height(16.dp))
                Text(
                    text = art.description,
                    style = MaterialTheme.typography.bodyLarge.copy(
                        fontStyle = FontStyle.Italic,
                        lineHeight = 28.sp,
                    ),
                    color = TextSecondary,
                )
                Spacer(modifier = Modifier.height(32.dp))

                // Series info
                Text(
                    text = "Sobre a Série",
                    style = MaterialTheme.typography.titleMedium,
                    color = TextPrimary,
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = art.series.description,
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextTertiary,
                    lineHeight = 24.sp,
                )
                Spacer(modifier = Modifier.height(48.dp))
            }
        }
    }
}
