package com.wanbitha.app.ui.screens.home

import androidx.compose.animation.animateContentSize
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.Brush
import androidx.compose.material.icons.filled.Layers
import androidx.compose.material.icons.filled.AutoAwesome
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.wanbitha.app.R
import com.wanbitha.app.ui.components.AnimatedCounter
import com.wanbitha.app.ui.components.ArtworkCard
import com.wanbitha.app.ui.components.GlassCard
import com.wanbitha.app.ui.components.GradientText
import com.wanbitha.app.ui.components.SectionDivider
import com.wanbitha.app.ui.theme.*

@Composable
fun HomeScreen(
    onNavigateToGallery: () -> Unit,
    onNavigateToAbout: () -> Unit,
    onNavigateToContact: () -> Unit,
    onNavigateToArtwork: (Int) -> Unit,
    viewModel: HomeViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .background(BackgroundDark),
    ) {
        // ═══ HERO SECTION ═══
        HeroSection(onExploreGallery = onNavigateToGallery)

        Spacer(modifier = Modifier.height(48.dp))
        SectionDivider()
        Spacer(modifier = Modifier.height(48.dp))

        // ═══ SERIES SECTION ═══
        SeriesSection()

        Spacer(modifier = Modifier.height(48.dp))
        SectionDivider()
        Spacer(modifier = Modifier.height(48.dp))

        // ═══ ABOUT SECTION ═══
        AboutPreviewSection(onNavigateToAbout = onNavigateToAbout)

        Spacer(modifier = Modifier.height(48.dp))
        SectionDivider()
        Spacer(modifier = Modifier.height(48.dp))

        // ═══ GALLERY PREVIEW ═══
        GalleryPreviewSection(
            artworks = uiState.featuredArtworks,
            onArtworkClick = onNavigateToArtwork,
            onViewAll = onNavigateToGallery,
        )

        Spacer(modifier = Modifier.height(48.dp))
        SectionDivider()
        Spacer(modifier = Modifier.height(48.dp))

        // ═══ MANIFESTO ═══
        ManifestoSection()

        Spacer(modifier = Modifier.height(48.dp))

        // ═══ STATS ═══
        StatsSection(stats = uiState.stats)

        Spacer(modifier = Modifier.height(48.dp))
        SectionDivider()
        Spacer(modifier = Modifier.height(48.dp))

        // ═══ FOOTER / CTA ═══
        FooterSection(onNavigateToContact = onNavigateToContact)

        Spacer(modifier = Modifier.height(32.dp))
    }
}

@Composable
private fun HeroSection(onExploreGallery: () -> Unit) {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .statusBarsPadding()
            .padding(horizontal = 24.dp, vertical = 48.dp),
        contentAlignment = Alignment.Center,
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            // Badge
            Box(
                modifier = Modifier
                    .clip(CircleShape)
                    .background(GlassBackground)
                    .padding(horizontal = 20.dp, vertical = 8.dp),
            ) {
                Row(verticalAlignment = Alignment.CenterVertically) {
                    Box(
                        modifier = Modifier
                            .size(6.dp)
                            .clip(CircleShape)
                            .background(Lavender),
                    )
                    Spacer(modifier = Modifier.width(8.dp))
                    Text(
                        text = stringResource(R.string.hero_badge).uppercase(),
                        style = MaterialTheme.typography.labelSmall,
                        color = TextFaint,
                    )
                }
            }

            Spacer(modifier = Modifier.height(32.dp))

            // Title
            GradientText(
                text = stringResource(R.string.hero_title),
                style = MaterialTheme.typography.displayLarge.copy(fontSize = 72.sp),
                textAlign = TextAlign.Center,
            )

            Spacer(modifier = Modifier.height(16.dp))

            // Subtitle
            GradientText(
                text = stringResource(R.string.hero_subtitle),
                style = MaterialTheme.typography.headlineSmall,
                gradient = BrandGradients.lavenderGold,
                textAlign = TextAlign.Center,
            )

            Spacer(modifier = Modifier.height(24.dp))

            // Description
            Text(
                text = stringResource(R.string.hero_description),
                style = MaterialTheme.typography.bodyLarge,
                color = TextTertiary,
                textAlign = TextAlign.Center,
                modifier = Modifier.padding(horizontal = 16.dp),
            )

            Spacer(modifier = Modifier.height(32.dp))

            // CTA Button
            Button(
                onClick = onExploreGallery,
                shape = CircleShape,
                colors = ButtonDefaults.buttonColors(
                    containerColor = GlassBackground,
                ),
                contentPadding = PaddingValues(horizontal = 32.dp, vertical = 16.dp),
            ) {
                Text(
                    text = stringResource(R.string.hero_cta),
                    style = MaterialTheme.typography.labelLarge,
                    color = TextSecondary,
                )
                Spacer(modifier = Modifier.width(8.dp))
                Icon(
                    imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                    contentDescription = null,
                    tint = TextSecondary,
                    modifier = Modifier.size(16.dp),
                )
            }
        }
    }
}

@Composable
private fun SeriesSection() {
    Column(modifier = Modifier.padding(horizontal = 24.dp)) {
        Text(
            text = stringResource(R.string.about_section_label).uppercase(),
            style = MaterialTheme.typography.labelMedium,
            color = RoseHot.copy(alpha = 0.8f),
        )
        Spacer(modifier = Modifier.height(16.dp))

        val seriesItems = listOf(
            Triple(Icons.Default.Brush, R.string.series_emotions, R.string.series_emotions_desc),
            Triple(Icons.Default.Layers, R.string.series_textures, R.string.series_textures_desc),
            Triple(Icons.Default.AutoAwesome, R.string.series_contemporary, R.string.series_contemporary_desc),
        )

        seriesItems.forEach { (icon, titleRes, descRes) ->
            SeriesCard(
                icon = icon,
                title = stringResource(titleRes),
                description = stringResource(descRes),
            )
            Spacer(modifier = Modifier.height(12.dp))
        }
    }
}

@Composable
private fun SeriesCard(
    icon: ImageVector,
    title: String,
    description: String,
) {
    GlassCard(
        modifier = Modifier.fillMaxWidth(),
        innerPadding = 20.dp,
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(Lavender.copy(alpha = 0.1f)),
                contentAlignment = Alignment.Center,
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = Lavender,
                    modifier = Modifier.size(24.dp),
                )
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column(modifier = Modifier.weight(1f)) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    color = TextPrimary,
                )
                Spacer(modifier = Modifier.height(4.dp))
                Text(
                    text = description,
                    style = MaterialTheme.typography.bodySmall,
                    color = TextTertiary,
                )
            }
        }
    }
}

@Composable
private fun AboutPreviewSection(onNavigateToAbout: () -> Unit) {
    Column(modifier = Modifier.padding(horizontal = 24.dp)) {
        GradientText(
            text = stringResource(R.string.about_title),
            style = MaterialTheme.typography.displaySmall,
            gradient = BrandGradients.roseLavender,
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = stringResource(R.string.about_bio),
            style = MaterialTheme.typography.bodyLarge,
            color = TextSecondary,
            lineHeight = 28.sp,
        )
        Spacer(modifier = Modifier.height(16.dp))
        Text(
            text = stringResource(R.string.about_highlight),
            style = MaterialTheme.typography.bodyLarge.copy(fontStyle = FontStyle.Italic),
            color = RoseSoft,
            lineHeight = 28.sp,
        )
        Spacer(modifier = Modifier.height(24.dp))
        Button(
            onClick = onNavigateToAbout,
            shape = CircleShape,
            colors = ButtonDefaults.buttonColors(containerColor = GlassBackground),
            contentPadding = PaddingValues(horizontal = 24.dp, vertical = 12.dp),
        ) {
            Text(
                text = "Conhecer Mais",
                style = MaterialTheme.typography.labelLarge,
                color = TextSecondary,
            )
        }
    }
}

@Composable
private fun GalleryPreviewSection(
    artworks: List<com.wanbitha.app.data.model.Artwork>,
    onArtworkClick: (Int) -> Unit,
    onViewAll: () -> Unit,
) {
    Column {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            GradientText(
                text = stringResource(R.string.gallery_title),
                style = MaterialTheme.typography.headlineMedium,
                gradient = BrandGradients.fullSpectrum,
            )
            Button(
                onClick = onViewAll,
                shape = CircleShape,
                colors = ButtonDefaults.buttonColors(containerColor = Color.Transparent),
                contentPadding = PaddingValues(horizontal = 16.dp, vertical = 8.dp),
            ) {
                Text(
                    text = "Ver Todas",
                    style = MaterialTheme.typography.labelLarge,
                    color = Lavender,
                )
            }
        }
        Spacer(modifier = Modifier.height(8.dp))
        Text(
            text = stringResource(R.string.gallery_subtitle),
            style = MaterialTheme.typography.bodyMedium,
            color = TextTertiary,
            modifier = Modifier.padding(horizontal = 24.dp),
        )
        Spacer(modifier = Modifier.height(20.dp))

        LazyRow(
            contentPadding = PaddingValues(horizontal = 24.dp),
            horizontalArrangement = Arrangement.spacedBy(16.dp),
        ) {
            items(artworks, key = { it.id }) { artwork ->
                ArtworkCard(
                    artwork = artwork,
                    onClick = { onArtworkClick(artwork.id) },
                    modifier = Modifier.width(260.dp),
                )
            }
        }
    }
}

@Composable
private fun ManifestoSection() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 24.dp)
            .clip(MaterialTheme.shapes.extraLarge)
            .background(
                Brush.linearGradient(
                    colors = listOf(
                        SurfaceDark,
                        SurfaceElevated,
                    ),
                    start = Offset.Zero,
                    end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY),
                )
            )
            .padding(32.dp),
        contentAlignment = Alignment.Center,
    ) {
        Column(horizontalAlignment = Alignment.CenterHorizontally) {
            Text(
                text = stringResource(R.string.manifesto_title).uppercase(),
                style = MaterialTheme.typography.labelMedium,
                color = TextFaint,
            )
            Spacer(modifier = Modifier.height(24.dp))
            Text(
                text = stringResource(R.string.manifesto_quote),
                style = MaterialTheme.typography.headlineSmall.copy(
                    fontStyle = FontStyle.Italic,
                    lineHeight = 36.sp,
                ),
                color = TextPrimary,
                textAlign = TextAlign.Center,
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = stringResource(R.string.manifesto_author),
                style = MaterialTheme.typography.labelMedium,
                color = TextFaint,
            )
        }
    }
}

@Composable
private fun StatsSection(stats: List<com.wanbitha.app.data.model.ArtistStat>) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 24.dp),
        horizontalArrangement = Arrangement.SpaceEvenly,
    ) {
        stats.forEach { stat ->
            AnimatedCounter(
                value = stat.value,
                label = stat.label,
                modifier = Modifier.weight(1f),
            )
        }
    }
}

@Composable
private fun FooterSection(onNavigateToContact: () -> Unit) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        Text(
            text = stringResource(R.string.footer_cta_title),
            style = MaterialTheme.typography.displaySmall,
            color = TextPrimary,
            textAlign = TextAlign.Center,
        )
        Spacer(modifier = Modifier.height(12.dp))
        Text(
            text = stringResource(R.string.footer_cta_desc),
            style = MaterialTheme.typography.bodyLarge,
            color = TextTertiary,
            textAlign = TextAlign.Center,
        )
        Spacer(modifier = Modifier.height(24.dp))
        Button(
            onClick = onNavigateToContact,
            shape = CircleShape,
            colors = ButtonDefaults.buttonColors(
                containerColor = Color.White,
            ),
            contentPadding = PaddingValues(horizontal = 32.dp, vertical = 16.dp),
        ) {
            Text(
                text = "Entrar em Contato",
                style = MaterialTheme.typography.labelLarge,
                color = BackgroundDark,
            )
            Spacer(modifier = Modifier.width(8.dp))
            Icon(
                imageVector = Icons.AutoMirrored.Filled.ArrowForward,
                contentDescription = null,
                tint = BackgroundDark,
                modifier = Modifier.size(16.dp),
            )
        }
        Spacer(modifier = Modifier.height(48.dp))
        Text(
            text = stringResource(R.string.footer_copyright),
            style = MaterialTheme.typography.bodySmall,
            color = TextFaint,
            textAlign = TextAlign.Center,
        )
    }
}
