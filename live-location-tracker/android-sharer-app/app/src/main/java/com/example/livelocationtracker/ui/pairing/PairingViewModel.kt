package com.example.livelocationtracker.ui.pairing

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.livelocationtracker.network.CreatePairingCodeRequest
import com.example.livelocationtracker.network.PairingApiService
import dagger.hilt.android.lifecycle.HiltViewModel
import javax.inject.Inject
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

@HiltViewModel
class PairingViewModel @Inject constructor(private val pairingApiService: PairingApiService) :
        ViewModel() {

    private val _pairingCode = MutableStateFlow<String?>(null)
    val pairingCode: StateFlow<String?> = _pairingCode

    private val _isLoading = MutableStateFlow(false)
    val isLoading: StateFlow<Boolean> = _isLoading

    private val _error = MutableStateFlow<String?>(null)
    val error: StateFlow<String?> = _error

    fun generateCode(userId: String) {
        viewModelScope.launch {
            _isLoading.value = true
            _error.value = null
            try {
                val response = pairingApiService.createCode(CreatePairingCodeRequest(userId))
                _pairingCode.value = response.code
            } catch (e: Exception) {
                _error.value = "Failed to generate code: ${e.message}"
            } finally {
                _isLoading.value = false
            }
        }
    }
}
