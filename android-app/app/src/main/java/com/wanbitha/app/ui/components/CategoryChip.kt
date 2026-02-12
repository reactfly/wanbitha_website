package com.wanbitha.app.ui.components

import androidx.compose.foundation.border
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.FilterChip
import androidx.compose.material3.FilterChipDefaults
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import com.wanbitha.app.ui.theme.GlassBackground
import com.wanbitha.app.ui.theme.GlassBorder
import com.wanbitha.app.ui.theme.TextFaint
import com.wanbitha.app.ui.theme.TextPrimary

@Composable
fun CategoryChip(
    label: String,
    isSelected: Boolean,
    onClick: () -> Unit,
    modifier: Modifier = Modifier,
) {
    FilterChip(
        selected = isSelected,
        onClick = onClick,
        label = {
            Text(
                text = label.uppercase(),
                style = MaterialTheme.typography.labelSmall,
            )
        },
        modifier = modifier,
        shape = RoundedCornerShape(50),
        colors = FilterChipDefaults.filterChipColors(
            containerColor = GlassBackground,
            labelColor = TextFaint,
            selectedContainerColor = Color.White.copy(alpha = 0.1f),
            selectedLabelColor = TextPrimary,
        ),
        border = FilterChipDefaults.filterChipBorder(
            borderColor = GlassBorder,
            selectedBorderColor = Color.White.copy(alpha = 0.2f),
            enabled = true,
            selected = isSelected,
        ),
    )
}
