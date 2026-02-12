package com.wanbitha.app.ui.components

import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.style.TextAlign
import com.wanbitha.app.ui.theme.BrandGradients

@Composable
fun GradientText(
    text: String,
    modifier: Modifier = Modifier,
    style: TextStyle = MaterialTheme.typography.displayLarge,
    gradient: List<Color> = BrandGradients.fullSpectrum,
    textAlign: TextAlign = TextAlign.Start,
) {
    androidx.compose.material3.Text(
        text = text,
        modifier = modifier,
        style = style.copy(
            brush = Brush.linearGradient(
                colors = gradient,
                start = Offset.Zero,
                end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY),
            )
        ),
        textAlign = textAlign,
    )
}
