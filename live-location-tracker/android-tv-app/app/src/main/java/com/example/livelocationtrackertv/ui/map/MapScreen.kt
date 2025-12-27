package com.example.livelocationtrackertv.ui.map

import androidx.compose.foundation.Canvas
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.material.CircularProgressIndicator
import androidx.compose.material.MaterialTheme
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp
import androidx.hilt.navigation.compose.hiltViewModel

@Composable
fun MapScreen(userId: String, viewModel: MapViewModel = hiltViewModel()) {
    val locationState by viewModel.locationState.collectAsState()

    LaunchedEffect(userId) { viewModel.startPolling(userId) }

    Box(
            modifier = Modifier.fillMaxSize().background(Color.DarkGray),
            contentAlignment = Alignment.Center
    ) {
        when (val state = locationState) {
            is LocationState.Loading -> {
                CircularProgressIndicator(color = Color.White)
            }
            is LocationState.Error -> {
                Text(text = state.message, color = Color.White)
            }
            is LocationState.Success -> {
                Column(horizontalAlignment = Alignment.CenterHorizontally) {
                    Text(
                            text = "Tracking User: $userId",
                            color = Color.White,
                            style = MaterialTheme.typography.h6
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(
                            text =
                                    "Lat: ${state.location.latitude}, Lng: ${state.location.longitude}",
                            color = Color.White
                    )
                    Spacer(modifier = Modifier.height(32.dp))

                    // Simple visualization of a "dot" on a "map"
                    Canvas(modifier = Modifier.size(200.dp).background(Color.LightGray)) {
                        // Just draw a dot in the center for now as a placeholder for real map logic
                        drawCircle(color = Color.Red, radius = 10.dp.toPx(), center = center)
                    }
                }
            }
        }
    }
}
