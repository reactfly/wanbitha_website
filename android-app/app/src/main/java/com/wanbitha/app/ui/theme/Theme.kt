package com.wanbitha.app.ui.theme

import android.app.Activity
import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.SideEffect
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalView
import androidx.core.view.WindowCompat

// WanBitha is always dark — the brand identity is built on a dark canvas
private val WanBithaColorScheme = darkColorScheme(
    primary = Lavender,
    onPrimary = TextPrimary,
    primaryContainer = LavenderDark,
    onPrimaryContainer = TextPrimary,

    secondary = RoseHot,
    onSecondary = TextPrimary,
    secondaryContainer = SurfaceElevated,
    onSecondaryContainer = RoseSoft,

    tertiary = Gold,
    onTertiary = BackgroundDark,
    tertiaryContainer = SurfaceCard,
    onTertiaryContainer = Gold,

    background = BackgroundDark,
    onBackground = TextPrimary,

    surface = SurfaceDark,
    onSurface = TextPrimary,
    surfaceVariant = SurfaceElevated,
    onSurfaceVariant = TextSecondary,

    outline = GlassBorder,
    outlineVariant = GlassBackground,

    error = ErrorRed,
    onError = TextPrimary,
)

@Composable
fun WanBithaTheme(
    content: @Composable () -> Unit
) {
    val view = LocalView.current
    if (!view.isInEditMode) {
        SideEffect {
            val window = (view.context as Activity).window
            window.statusBarColor = BackgroundDark.toArgb()
            window.navigationBarColor = BackgroundDark.toArgb()
            WindowCompat.getInsetsController(window, view).apply {
                isAppearanceLightStatusBars = false
                isAppearanceLightNavigationBars = false
            }
        }
    }

    MaterialTheme(
        colorScheme = WanBithaColorScheme,
        typography = WanBithaTypography,
        shapes = WanBithaShapes,
        content = content,
    )
}
