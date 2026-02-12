package com.wanbitha.app.ui

import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.rememberNavController
import com.wanbitha.app.ui.navigation.WanBithaNavGraph
import com.wanbitha.app.ui.theme.BackgroundDark

@Composable
fun WanBithaAppRoot() {
    val navController = rememberNavController()

    Surface(
        modifier = Modifier.fillMaxSize(),
        color = BackgroundDark,
    ) {
        WanBithaNavGraph(navController = navController)
    }
}
