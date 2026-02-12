package com.wanbitha.app.ui.navigation

import androidx.compose.animation.AnimatedContentTransitionScope
import androidx.compose.animation.core.tween
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.toRoute
import com.wanbitha.app.ui.screens.about.AboutScreen
import com.wanbitha.app.ui.screens.artwork.ArtworkDetailScreen
import com.wanbitha.app.ui.screens.contact.ContactScreen
import com.wanbitha.app.ui.screens.gallery.GalleryScreen
import com.wanbitha.app.ui.screens.home.HomeScreen

private const val TRANSITION_DURATION = 400

@Composable
fun WanBithaNavGraph(
    navController: NavHostController,
) {
    NavHost(
        navController = navController,
        startDestination = Screen.Home,
        enterTransition = {
            fadeIn(tween(TRANSITION_DURATION)) + slideIntoContainer(
                towards = AnimatedContentTransitionScope.SlideDirection.Start,
                animationSpec = tween(TRANSITION_DURATION)
            )
        },
        exitTransition = {
            fadeOut(tween(TRANSITION_DURATION)) + slideOutOfContainer(
                towards = AnimatedContentTransitionScope.SlideDirection.Start,
                animationSpec = tween(TRANSITION_DURATION)
            )
        },
        popEnterTransition = {
            fadeIn(tween(TRANSITION_DURATION)) + slideIntoContainer(
                towards = AnimatedContentTransitionScope.SlideDirection.End,
                animationSpec = tween(TRANSITION_DURATION)
            )
        },
        popExitTransition = {
            fadeOut(tween(TRANSITION_DURATION)) + slideOutOfContainer(
                towards = AnimatedContentTransitionScope.SlideDirection.End,
                animationSpec = tween(TRANSITION_DURATION)
            )
        },
    ) {
        composable<Screen.Home> {
            HomeScreen(
                onNavigateToGallery = { navController.navigate(Screen.Gallery) },
                onNavigateToAbout = { navController.navigate(Screen.About) },
                onNavigateToContact = { navController.navigate(Screen.Contact) },
                onNavigateToArtwork = { id -> navController.navigate(Screen.ArtworkDetail(id)) },
            )
        }

        composable<Screen.Gallery> {
            GalleryScreen(
                onNavigateBack = { navController.popBackStack() },
                onNavigateToArtwork = { id -> navController.navigate(Screen.ArtworkDetail(id)) },
            )
        }

        composable<Screen.ArtworkDetail> { backStackEntry ->
            val route = backStackEntry.toRoute<Screen.ArtworkDetail>()
            ArtworkDetailScreen(
                artworkId = route.artworkId,
                onNavigateBack = { navController.popBackStack() },
            )
        }

        composable<Screen.About> {
            AboutScreen(
                onNavigateBack = { navController.popBackStack() },
                onNavigateToContact = { navController.navigate(Screen.Contact) },
            )
        }

        composable<Screen.Contact> {
            ContactScreen(
                onNavigateBack = { navController.popBackStack() },
            )
        }
    }
}
