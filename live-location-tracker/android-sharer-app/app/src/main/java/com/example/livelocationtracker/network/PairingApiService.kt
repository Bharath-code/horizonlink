package com.example.livelocationtracker.network

import retrofit2.http.Body
import retrofit2.http.POST

interface PairingApiService {
    @POST("pairing/code")
    suspend fun createCode(@Body request: CreatePairingCodeRequest): CreatePairingCodeResponse
}
