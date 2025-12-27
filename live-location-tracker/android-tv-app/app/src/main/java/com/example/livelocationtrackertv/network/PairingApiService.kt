package com.example.livelocationtrackertv.network

import retrofit2.http.Body
import retrofit2.http.POST

data class VerifyPairingCodeRequest(val code: String, val deviceId: String)

data class VerifyPairingCodeResponse(val status: String, val userId: String, val token: String)

interface PairingApiService {
    @POST("pairing/verify")
    suspend fun verifyCode(@Body request: VerifyPairingCodeRequest): VerifyPairingCodeResponse
}
