package com.wanbitha.app.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.wanbitha.app.R

// ═══ Font Families ═══
val BodoniModa = FontFamily(
    Font(R.font.bodoni_moda_regular, FontWeight.Normal),
    Font(R.font.bodoni_moda_medium, FontWeight.Medium),
    Font(R.font.bodoni_moda_bold, FontWeight.Bold),
    Font(R.font.bodoni_moda_italic, FontWeight.Normal, FontStyle.Italic),
)

val CormorantGaramond = FontFamily(
    Font(R.font.cormorant_garamond_regular, FontWeight.Normal),
    Font(R.font.cormorant_garamond_medium, FontWeight.Medium),
    Font(R.font.cormorant_garamond_semibold, FontWeight.SemiBold),
    Font(R.font.cormorant_garamond_italic, FontWeight.Normal, FontStyle.Italic),
)

val Inter = FontFamily(
    Font(R.font.inter_regular, FontWeight.Normal),
    Font(R.font.inter_medium, FontWeight.Medium),
    Font(R.font.inter_semibold, FontWeight.SemiBold),
    Font(R.font.inter_bold, FontWeight.Bold),
)

// ═══ Typography Scale ═══
val WanBithaTypography = Typography(
    // Hero titles
    displayLarge = TextStyle(
        fontFamily = BodoniModa,
        fontWeight = FontWeight.Bold,
        fontSize = 56.sp,
        lineHeight = 52.sp,
        letterSpacing = (-2).sp,
    ),
    displayMedium = TextStyle(
        fontFamily = BodoniModa,
        fontWeight = FontWeight.Bold,
        fontSize = 44.sp,
        lineHeight = 42.sp,
        letterSpacing = (-1.5).sp,
    ),
    displaySmall = TextStyle(
        fontFamily = BodoniModa,
        fontWeight = FontWeight.Medium,
        fontSize = 36.sp,
        lineHeight = 38.sp,
        letterSpacing = (-1).sp,
    ),

    // Section headings
    headlineLarge = TextStyle(
        fontFamily = BodoniModa,
        fontWeight = FontWeight.Bold,
        fontSize = 32.sp,
        lineHeight = 36.sp,
        letterSpacing = (-0.5).sp,
    ),
    headlineMedium = TextStyle(
        fontFamily = BodoniModa,
        fontWeight = FontWeight.Medium,
        fontSize = 28.sp,
        lineHeight = 32.sp,
    ),
    headlineSmall = TextStyle(
        fontFamily = BodoniModa,
        fontWeight = FontWeight.Medium,
        fontSize = 24.sp,
        lineHeight = 28.sp,
    ),

    // Titles
    titleLarge = TextStyle(
        fontFamily = BodoniModa,
        fontWeight = FontWeight.Medium,
        fontSize = 22.sp,
        lineHeight = 28.sp,
    ),
    titleMedium = TextStyle(
        fontFamily = Inter,
        fontWeight = FontWeight.SemiBold,
        fontSize = 16.sp,
        lineHeight = 24.sp,
        letterSpacing = 0.15.sp,
    ),
    titleSmall = TextStyle(
        fontFamily = Inter,
        fontWeight = FontWeight.Medium,
        fontSize = 14.sp,
        lineHeight = 20.sp,
        letterSpacing = 0.1.sp,
    ),

    // Body
    bodyLarge = TextStyle(
        fontFamily = Inter,
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp,
        lineHeight = 24.sp,
    ),
    bodyMedium = TextStyle(
        fontFamily = Inter,
        fontWeight = FontWeight.Normal,
        fontSize = 14.sp,
        lineHeight = 20.sp,
    ),
    bodySmall = TextStyle(
        fontFamily = Inter,
        fontWeight = FontWeight.Normal,
        fontSize = 12.sp,
        lineHeight = 16.sp,
    ),

    // Labels
    labelLarge = TextStyle(
        fontFamily = Inter,
        fontWeight = FontWeight.SemiBold,
        fontSize = 14.sp,
        lineHeight = 20.sp,
        letterSpacing = 0.1.sp,
    ),
    labelMedium = TextStyle(
        fontFamily = Inter,
        fontWeight = FontWeight.Medium,
        fontSize = 12.sp,
        lineHeight = 16.sp,
        letterSpacing = 2.sp,
    ),
    labelSmall = TextStyle(
        fontFamily = Inter,
        fontWeight = FontWeight.Medium,
        fontSize = 10.sp,
        lineHeight = 14.sp,
        letterSpacing = 3.sp,
    ),
)

// ═══ Editorial Style (Cormorant) ═══
val EditorialStyle = TextStyle(
    fontFamily = CormorantGaramond,
    fontWeight = FontWeight.Normal,
    fontSize = 18.sp,
    lineHeight = 28.sp,
    fontStyle = FontStyle.Italic,
)
