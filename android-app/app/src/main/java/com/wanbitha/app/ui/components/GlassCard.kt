package com.wanbitha.app.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.BoxScope
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.wanbitha.app.ui.theme.GlassBackground
import com.wanbitha.app.ui.theme.GlassBorder

@Composable
fun GlassCard(
    modifier: Modifier = Modifier,
    cornerRadius: Dp = 24.dp,
    innerPadding: Dp = 24.dp,
    content: @Composable BoxScope.() -> Unit,
) {
    val shape = MaterialTheme.shapes.large

    Box(
        modifier = modifier
            .clip(shape)
            .background(GlassBackground)
            .border(
                width = 1.dp,
                color = GlassBorder,
                shape = shape,
            )
            .padding(innerPadding),
        content = content,
    )
}
