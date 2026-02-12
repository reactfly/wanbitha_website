package com.wanbitha.app.ui.components

import androidx.compose.animation.core.animateIntAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.wanbitha.app.ui.theme.BrandGradients
import com.wanbitha.app.ui.theme.TextFaint

@Composable
fun AnimatedCounter(
    value: String,
    label: String,
    modifier: Modifier = Modifier,
) {
    val numericPart = value.filter { it.isDigit() }
    val suffix = value.filter { !it.isDigit() }
    val targetValue = numericPart.toIntOrNull() ?: 0

    var isVisible by remember { mutableStateOf(false) }
    LaunchedEffect(Unit) { isVisible = true }

    val animatedValue by animateIntAsState(
        targetValue = if (isVisible) targetValue else 0,
        animationSpec = tween(durationMillis = 2500),
        label = "counter",
    )

    Column(
        horizontalAlignment = Alignment.CenterHorizontally,
        modifier = modifier.padding(vertical = 8.dp),
    ) {
        Text(
            text = "$animatedValue$suffix",
            style = TextStyle(
                fontWeight = FontWeight.Bold,
                fontSize = 48.sp,
                brush = Brush.linearGradient(
                    colors = BrandGradients.lavenderGold,
                    start = Offset.Zero,
                    end = Offset(Float.POSITIVE_INFINITY, Float.POSITIVE_INFINITY),
                ),
            ),
        )
        Text(
            text = label.uppercase(),
            style = MaterialTheme.typography.labelMedium,
            color = TextFaint,
            textAlign = TextAlign.Center,
        )
    }
}
