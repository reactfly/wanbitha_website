package com.wanbitha.app.ui.screens.contact

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.wanbitha.app.data.model.ContactMessage
import com.wanbitha.app.data.repository.ArtworkRepository
import dagger.hilt.android.lifecycle.HiltViewModel
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.flow.asStateFlow
import kotlinx.coroutines.flow.update
import kotlinx.coroutines.launch
import javax.inject.Inject

@HiltViewModel
class ContactViewModel @Inject constructor(
    private val repository: ArtworkRepository,
) : ViewModel() {

    private val _uiState = MutableStateFlow(ContactUiState())
    val uiState: StateFlow<ContactUiState> = _uiState.asStateFlow()

    fun onNameChanged(value: String) {
        _uiState.update { it.copy(name = value) }
    }

    fun onEmailChanged(value: String) {
        _uiState.update { it.copy(email = value) }
    }

    fun onSubjectChanged(value: String) {
        _uiState.update { it.copy(subject = value) }
    }

    fun onMessageChanged(value: String) {
        _uiState.update { it.copy(message = value) }
    }

    fun onSendMessage() {
        val state = _uiState.value
        if (state.name.isBlank() || state.email.isBlank() || state.message.isBlank()) return

        _uiState.update { it.copy(isSending = true, error = null) }

        viewModelScope.launch {
            val result = repository.sendContactMessage(
                ContactMessage(
                    name = state.name,
                    email = state.email,
                    subject = state.subject,
                    message = state.message,
                )
            )

            result.fold(
                onSuccess = {
                    _uiState.update { it.copy(isSending = false, isSent = true) }
                },
                onFailure = { e ->
                    _uiState.update {
                        it.copy(isSending = false, error = e.message ?: "Erro desconhecido")
                    }
                }
            )
        }
    }

    fun onResetForm() {
        _uiState.value = ContactUiState()
    }
}
