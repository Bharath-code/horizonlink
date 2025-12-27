package com.example.livelocationtrackertv.ui.pairing

import androidx.compose.foundation.layout.*
import androidx.compose.material.Button
import androidx.compose.material.CircularProgressIndicator
import androidx.compose.material.MaterialTheme
import androidx.compose.material.OutlinedTextField
import androidx.compose.material.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel

@Composable
fun CodeEntryScreen(
        viewModel: TvPairingViewModel = hiltViewModel(),
        onPairingSuccess: (String) -> Unit = {}
) {
    val pairingStatus by viewModel.pairingStatus.collectAsState()
    var code by remember { mutableStateOf("") }

    Column(
            modifier = Modifier.fillMaxSize().padding(32.dp),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
    ) {
        Text(
                text = "Enter Pairing Code",
                style = MaterialTheme.typography.h4,
                modifier = Modifier.padding(bottom = 32.dp)
        )

        when (val status = pairingStatus) {
            is PairingStatus.Idle, is PairingStatus.Error -> {
                OutlinedTextField(
                        value = code,
                        onValueChange = { if (it.length <= 6) code = it },
                        label = { Text("6-Digit Code") },
                        singleLine = true,
                        modifier = Modifier.width(300.dp)
                )
                Spacer(modifier = Modifier.height(16.dp))
                Button(onClick = { viewModel.verifyCode(code) }, enabled = code.length == 6) {
                    Text("Connect")
                }
                if (status is PairingStatus.Error) {
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(text = status.message, color = MaterialTheme.colors.error)
                }
            }
            is PairingStatus.Loading -> {
                CircularProgressIndicator()
                Spacer(modifier = Modifier.height(16.dp))
                Text("Verifying code...")
            }
            is PairingStatus.Success -> {
                LaunchedEffect(status.userId) { onPairingSuccess(status.userId) }
                Text(
                        text = "Success! Paired with user: ${status.userId}",
                        style = MaterialTheme.typography.h5,
                        color = MaterialTheme.colors.primary
                )
                // In Phase 3, we will navigate to the Map Screen here
            }
        }
    }
}
