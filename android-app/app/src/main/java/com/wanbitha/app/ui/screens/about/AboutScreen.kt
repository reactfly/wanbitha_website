package com.wanbitha.app.ui.screens.about

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
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.automirrored.filled.ArrowForward
import androidx.compose.material.icons.filled.Brush
import androidx.compose.material.icons.filled.Layers
import androidx.compose.material.icons.filled.Lightbulb
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
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
import com.wanbitha.app.R
import com.wanbitha.app.ui.components.GlassCard
import com.wanbitha.app.ui.components.GradientText
import com.wanbitha.app.ui.components.SectionDivider
import com.wanbitha.app.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun AboutScreen(
    onNavigateBack: () -> Unit,
    onNavigateToContact: () -> Unit,
) {
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

        // Section header
        Column(modifier = Modifier.padding(horizontal = 24.dp)) {
            Text(
                text = stringResource(R.string.about_section_label).uppercase(),
                style = MaterialTheme.typography.labelMedium,
                color = RoseHot.copy(alpha = 0.8f),
            )
            Spacer(modifier = Modifier.height(12.dp))
            GradientText(
                text = stringResource(R.string.about_title),
                style = MaterialTheme.typography.displaySmall,
                gradient = BrandGradients.roseLavender,
            )
        }

        Spacer(modifier = Modifier.height(32.dp))

        // Bio
        Column(modifier = Modifier.padding(horizontal = 24.dp)) {
            Text(
                text = stringResource(R.string.about_bio),
                style = MaterialTheme.typography.bodyLarge.copy(lineHeight = 28.sp),
                color = TextSecondary,
            )
            Spacer(modifier = Modifier.height(16.dp))
            Text(
                text = stringResource(R.string.about_highlight),
                style = MaterialTheme.typography.bodyLarge.copy(
                    fontStyle = FontStyle.Italic,
                    lineHeight = 28.sp,
                ),
                color = RoseSoft,
            )
        }

        Spacer(modifier = Modifier.height(40.dp))
        SectionDivider()
        Spacer(modifier = Modifier.height(40.dp))

        // Three pillars
        Column(modifier = Modifier.padding(horizontal = 24.dp)) {
            val pillars = listOf(
                Triple(Icons.Default.Brush, R.string.feature_expression_title, R.string.feature_expression_desc),
                Triple(Icons.Default.Layers, R.string.feature_technique_title, R.string.feature_technique_desc),
                Triple(Icons.Default.Lightbulb, R.string.feature_mission_title, R.string.feature_mission_desc),
            )

            pillars.forEach { (icon, titleRes, descRes) ->
                PillarCard(
                    icon = icon,
                    title = stringResource(titleRes),
                    description = stringResource(descRes),
                )
                Spacer(modifier = Modifier.height(12.dp))
            }
        }

        Spacer(modifier = Modifier.height(40.dp))
        SectionDivider()
        Spacer(modifier = Modifier.height(40.dp))

        // Manifesto
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp)
                .clip(MaterialTheme.shapes.extraLarge)
                .background(
                    Brush.linearGradient(
                        colors = listOf(SurfaceDark, SurfaceElevated),
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

        Spacer(modifier = Modifier.height(48.dp))

        // CTA
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
        ) {
            Button(
                onClick = onNavigateToContact,
                shape = CircleShape,
                colors = ButtonDefaults.buttonColors(containerColor = Color.White),
                contentPadding = PaddingValues(horizontal = 32.dp, vertical = 16.dp),
            ) {
                Text(
                    text = "Fale Comigo",
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
        }

        Spacer(modifier = Modifier.height(48.dp))
    }
}

@Composable
private fun PillarCard(
    icon: ImageVector,
    title: String,
    description: String,
) {
    GlassCard(
        modifier = Modifier.fillMaxWidth(),
        innerPadding = 20.dp,
    ) {
        Row(verticalAlignment = Alignment.Top) {
            Box(
                modifier = Modifier
                    .size(48.dp)
                    .clip(RoundedCornerShape(12.dp))
                    .background(RoseHot.copy(alpha = 0.1f)),
                contentAlignment = Alignment.Center,
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = RoseHot,
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
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = description,
                    style = MaterialTheme.typography.bodyMedium.copy(lineHeight = 22.sp),
                    color = TextTertiary,
                )
            }
        }
    }
}
