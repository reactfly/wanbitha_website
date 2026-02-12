package com.wanbitha.app.ui.screens.contact

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.scaleIn
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.statusBarsPadding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.CheckCircle
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.LocationOn
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.OutlinedTextFieldDefaults
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.platform.LocalFocusManager
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.wanbitha.app.R
import com.wanbitha.app.ui.components.GlassCard
import com.wanbitha.app.ui.components.GradientText
import com.wanbitha.app.ui.theme.*

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ContactScreen(
    onNavigateBack: () -> Unit,
    viewModel: ContactViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    val focusManager = LocalFocusManager.current

    val textFieldColors = OutlinedTextFieldDefaults.colors(
        unfocusedContainerColor = GlassBackground,
        focusedContainerColor = GlassElevated,
        unfocusedBorderColor = GlassBorder,
        focusedBorderColor = Lavender.copy(alpha = 0.5f),
        cursorColor = Lavender,
        unfocusedTextColor = TextPrimary,
        focusedTextColor = TextPrimary,
        unfocusedLabelColor = TextFaint,
        focusedLabelColor = Lavender,
        unfocusedPlaceholderColor = TextFaint,
        focusedPlaceholderColor = TextTertiary,
    )

    Column(
        modifier = Modifier
            .fillMaxSize()
            .background(BackgroundDark)
            .verticalScroll(rememberScrollState()),
    ) {
        // Top bar
        TopAppBar(
            title = { },
            navigationIcon = {
                IconButton(onClick = onNavigateBack) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Filled.ArrowBack,
                        contentDescription = stringResource(R.string.cd_back),
                        tint = TextSecondary,
                    )
                }
            },
            colors = TopAppBarDefaults.topAppBarColors(containerColor = Color.Transparent),
            modifier = Modifier.statusBarsPadding(),
        )

        // Header
        Column(modifier = Modifier.padding(horizontal = 24.dp)) {
            Text(
                text = stringResource(R.string.contact_section_label).uppercase(),
                style = MaterialTheme.typography.labelMedium,
                color = TextTertiary,
            )
            Spacer(modifier = Modifier.height(8.dp))
            GradientText(
                text = stringResource(R.string.contact_title),
                style = MaterialTheme.typography.displaySmall,
                gradient = BrandGradients.fullSpectrum,
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text(
                text = stringResource(R.string.contact_subtitle),
                style = MaterialTheme.typography.bodyLarge,
                color = TextTertiary,
            )
        }

        Spacer(modifier = Modifier.height(32.dp))

        // Success State
        AnimatedVisibility(
            visible = uiState.isSent,
            enter = fadeIn() + scaleIn(),
            exit = fadeOut(),
        ) {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 24.dp, vertical = 48.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
            ) {
                Box(
                    modifier = Modifier
                        .size(80.dp)
                        .clip(CircleShape)
                        .background(SuccessGreen.copy(alpha = 0.2f)),
                    contentAlignment = Alignment.Center,
                ) {
                    Icon(
                        imageVector = Icons.Default.CheckCircle,
                        contentDescription = null,
                        tint = SuccessGreen,
                        modifier = Modifier.size(40.dp),
                    )
                }
                Spacer(modifier = Modifier.height(24.dp))
                Text(
                    text = stringResource(R.string.contact_success_title),
                    style = MaterialTheme.typography.headlineSmall,
                    color = TextPrimary,
                )
                Spacer(modifier = Modifier.height(8.dp))
                Text(
                    text = stringResource(R.string.contact_success_message),
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextTertiary,
                    textAlign = TextAlign.Center,
                )
                Spacer(modifier = Modifier.height(32.dp))
                Button(
                    onClick = { viewModel.onResetForm() },
                    shape = CircleShape,
                    colors = ButtonDefaults.buttonColors(containerColor = GlassBackground),
                    contentPadding = PaddingValues(horizontal = 24.dp, vertical = 12.dp),
                ) {
                    Text(
                        text = stringResource(R.string.contact_send_another),
                        style = MaterialTheme.typography.labelLarge,
                        color = TextSecondary,
                    )
                }
            }
        }

        // Form
        AnimatedVisibility(
            visible = !uiState.isSent,
            enter = fadeIn(),
            exit = fadeOut(),
        ) {
            Column(modifier = Modifier.padding(horizontal = 24.dp)) {
                // Name + Email
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.spacedBy(12.dp),
                ) {
                    OutlinedTextField(
                        value = uiState.name,
                        onValueChange = viewModel::onNameChanged,
                        label = { Text(stringResource(R.string.contact_name_label)) },
                        placeholder = { Text(stringResource(R.string.contact_name_hint)) },
                        singleLine = true,
                        keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next),
                        colors = textFieldColors,
                        shape = RoundedCornerShape(16.dp),
                        modifier = Modifier.weight(1f),
                    )
                    OutlinedTextField(
                        value = uiState.email,
                        onValueChange = viewModel::onEmailChanged,
                        label = { Text(stringResource(R.string.contact_email_label)) },
                        placeholder = { Text(stringResource(R.string.contact_email_hint)) },
                        singleLine = true,
                        keyboardOptions = KeyboardOptions(
                            keyboardType = KeyboardType.Email,
                            imeAction = ImeAction.Next,
                        ),
                        colors = textFieldColors,
                        shape = RoundedCornerShape(16.dp),
                        modifier = Modifier.weight(1f),
                    )
                }

                Spacer(modifier = Modifier.height(12.dp))

                // Subject
                OutlinedTextField(
                    value = uiState.subject,
                    onValueChange = viewModel::onSubjectChanged,
                    label = { Text(stringResource(R.string.contact_subject_label)) },
                    placeholder = { Text(stringResource(R.string.contact_subject_hint)) },
                    singleLine = true,
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Next),
                    colors = textFieldColors,
                    shape = RoundedCornerShape(16.dp),
                    modifier = Modifier.fillMaxWidth(),
                )

                Spacer(modifier = Modifier.height(12.dp))

                // Message
                OutlinedTextField(
                    value = uiState.message,
                    onValueChange = viewModel::onMessageChanged,
                    label = { Text(stringResource(R.string.contact_message_label)) },
                    placeholder = { Text(stringResource(R.string.contact_message_hint)) },
                    minLines = 5,
                    maxLines = 8,
                    keyboardOptions = KeyboardOptions(imeAction = ImeAction.Done),
                    keyboardActions = KeyboardActions(onDone = {
                        focusManager.clearFocus()
                        viewModel.onSendMessage()
                    }),
                    colors = textFieldColors,
                    shape = RoundedCornerShape(16.dp),
                    modifier = Modifier.fillMaxWidth(),
                )

                Spacer(modifier = Modifier.height(24.dp))

                // Submit button
                Button(
                    onClick = {
                        focusManager.clearFocus()
                        viewModel.onSendMessage()
                    },
                    enabled = !uiState.isSending,
                    shape = RoundedCornerShape(16.dp),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = Color.Transparent,
                    ),
                    contentPadding = PaddingValues(),
                    modifier = Modifier
                        .fillMaxWidth()
                        .height(56.dp),
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxSize()
                            .background(
                                Brush.linearGradient(BrandGradients.roseLavender),
                                shape = RoundedCornerShape(16.dp),
                            ),
                        contentAlignment = Alignment.Center,
                    ) {
                        if (uiState.isSending) {
                            Row(verticalAlignment = Alignment.CenterVertically) {
                                CircularProgressIndicator(
                                    modifier = Modifier.size(20.dp),
                                    color = TextPrimary,
                                    strokeWidth = 2.dp,
                                )
                                Spacer(modifier = Modifier.width(12.dp))
                                Text(
                                    text = stringResource(R.string.contact_sending),
                                    style = MaterialTheme.typography.labelLarge,
                                    color = TextPrimary,
                                )
                            }
                        } else {
                            Text(
                                text = stringResource(R.string.contact_send),
                                style = MaterialTheme.typography.labelLarge,
                                color = TextPrimary,
                            )
                        }
                    }
                }
            }
        }

        Spacer(modifier = Modifier.height(32.dp))

        // Contact info cards
        Column(modifier = Modifier.padding(horizontal = 24.dp)) {
            ContactInfoCard(
                icon = Icons.Default.Email,
                label = stringResource(R.string.contact_email_label),
                value = stringResource(R.string.contact_email_value),
            )
            Spacer(modifier = Modifier.height(12.dp))
            ContactInfoCard(
                icon = Icons.Default.LocationOn,
                label = stringResource(R.string.contact_location_label),
                value = stringResource(R.string.contact_location_value),
            )
        }

        Spacer(modifier = Modifier.height(24.dp))

        // Quote card
        GlassCard(
            modifier = Modifier
                .fillMaxWidth()
                .padding(horizontal = 24.dp),
        ) {
            Column {
                Text(
                    text = stringResource(R.string.manifesto_quote),
                    style = MaterialTheme.typography.bodyMedium.copy(
                        fontStyle = FontStyle.Italic,
                        lineHeight = 24.sp,
                    ),
                    color = TextTertiary,
                )
                Spacer(modifier = Modifier.height(12.dp))
                Text(
                    text = stringResource(R.string.manifesto_author),
                    style = MaterialTheme.typography.labelSmall,
                    color = TextFaint,
                )
            }
        }

        Spacer(modifier = Modifier.height(48.dp))
    }
}

@Composable
private fun ContactInfoCard(
    icon: ImageVector,
    label: String,
    value: String,
) {
    GlassCard(
        modifier = Modifier.fillMaxWidth(),
        innerPadding = 16.dp,
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .clip(RoundedCornerShape(10.dp))
                    .background(Lavender.copy(alpha = 0.1f)),
                contentAlignment = Alignment.Center,
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = null,
                    tint = Lavender,
                    modifier = Modifier.size(18.dp),
                )
            }
            Spacer(modifier = Modifier.width(16.dp))
            Column {
                Text(
                    text = label.uppercase(),
                    style = MaterialTheme.typography.labelSmall,
                    color = TextFaint,
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = value,
                    style = MaterialTheme.typography.bodyMedium,
                    color = TextSecondary,
                )
            }
        }
    }
}
