package com.wanbitha.app.ui.screens.contact

data class ContactUiState(
    val name: String = "",
    val email: String = "",
    val subject: String = "",
    val message: String = "",
    val isSending: Boolean = false,
    val isSent: Boolean = false,
    val error: String? = null,
)
