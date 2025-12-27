package com.example.livelocationtrackertv.ui.map

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.livelocationtrackertv.network.LocationApiService
import com.example.livelocationtrackertv.network.LocationResponse
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch

@HiltViewModel
class MapViewModel @Inject constructor(private val locationApiService: LocationApiService) :
        ViewModel() {

    private val _locationState = MutableStateFlow<LocationState>(LocationState.Loading)
    val locationState: StateFlow<LocationState> = _locationState

    fun startPolling(userId: String) {
        viewModelScope.launch {
            while (isActive) {
                try {
                    val location = locationApiService.getLatestLocation(userId)
                    _locationState.value = LocationState.Success(location)
                } catch (e: Exception) {
                    // Keep showing last known location or error if none
                    if (_locationState.value !is LocationState.Success) {
                        _locationState.value =
                                LocationState.Error("Waiting for location updates...")
                    }
                }
                delay(5000) // Poll every 5 seconds
            }
        }
    }
}

sealed class LocationState {
    object Loading : LocationState()
    data class Success(val location: LocationResponse) : LocationState()
    data class Error(val message: String) : LocationState()
}
