package com.wanbitha.app.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp
import com.wanbitha.app.ui.theme.Lavender

@Composable
fun SectionDivider(
    modifier: Modifier = Modifier,
    height: Dp = 1.dp,
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = 48.dp)
            .height(height)
            .background(
                Brush.horizontalGradient(
                    colors = listOf(
                        Color.Transparent,
                        Lavender.copy(alpha = 0.4f),
                        Color.Transparent,
                    )
                )
            )
    )
}
