package com.wanbitha.app.ui.theme

import androidx.compose.ui.graphics.Color

// ═══ Brand Palette ═══
val RoseHot = Color(0xFFD946A8)
val RoseSoft = Color(0xFFF9A8D4)
val PinkAccent = Color(0xFFF472C4)
val Gold = Color(0xFFFBBF24)
val Lavender = Color(0xFFC084FC)
val LavenderDark = Color(0xFF9333EA)

// ═══ Backgrounds ═══
val BackgroundDark = Color(0xFF0A0A0A)
val SurfaceDark = Color(0xFF1A0A16)
val SurfaceElevated = Color(0xFF1A1A2E)
val SurfaceCard = Color(0xFF150D1A)

// ═══ Glass ═══
val GlassBackground = Color(0x0AFFFFFF)
val GlassBorder = Color(0x14FFFFFF)
val GlassElevated = Color(0x0DFFFFFF)

// ═══ Text ═══
val TextPrimary = Color(0xFFFFFFFF)
val TextSecondary = Color(0xB3FFFFFF)
val TextTertiary = Color(0x66FFFFFF)
val TextFaint = Color(0x33FFFFFF)

// ═══ Status ═══
val SuccessGreen = Color(0xFF4ADE80)
val ErrorRed = Color(0xFFF87171)

// ═══ Gradients (start/end pairs) ═══
object BrandGradients {
    val roseLavender = listOf(RoseHot, Lavender)
    val roseGold = listOf(RoseSoft, Gold)
    val lavenderGold = listOf(Lavender, Gold)
    val fullSpectrum = listOf(RoseSoft, Color.White, Lavender, RoseSoft)
    val warmMix = listOf(Lavender, Gold, PinkAccent)
}
