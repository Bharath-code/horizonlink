package com.example.livelocationtrackertv.ui.pairing

import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.livelocationtrackertv.network.PairingApiService
import com.example.livelocationtrackertv.network.VerifyPairingCodeRequest
import dagger.hilt.android.lifecycle.HiltViewModel
import java.util.UUID
import javax.inject.Inject
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow
import kotlinx.coroutines.launch

@HiltViewModel
class TvPairingViewModel @Inject constructor(private val pairingApiService: PairingApiService) :
        ViewModel() {

    private val _pairingStatus = MutableStateFlow<PairingStatus>(PairingStatus.Idle)
    val pairingStatus: StateFlow<PairingStatus> = _pairingStatus

    private val deviceId = UUID.randomUUID().toString() // Simple device ID generation

    fun verifyCode(code: String) {
        viewModelScope.launch {
            _pairingStatus.value = PairingStatus.Loading
            try {
                val response =
                        pairingApiService.verifyCode(VerifyPairingCodeRequest(code, deviceId))
                _pairingStatus.value = PairingStatus.Success(response.userId)
            } catch (e: Exception) {
                _pairingStatus.value = PairingStatus.Error("Invalid code or network error")
            }
        }
    }
}

sealed class PairingStatus {
    object Idle : PairingStatus()
    object Loading : PairingStatus()
    data class Success(val userId: String) : PairingStatus()
    data class Error(val message: String) : PairingStatus()
}
