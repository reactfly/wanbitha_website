package com.wanbitha.app.ui.navigation

import kotlinx.serialization.Serializable

sealed interface Screen {

    @Serializable
    data object Home : Screen

    @Serializable
    data object Gallery : Screen

    @Serializable
    data class ArtworkDetail(val artworkId: Int) : Screen

    @Serializable
    data object About : Screen

    @Serializable
    data object Contact : Screen
}
