package com.example.livelocationtrackertv.network

import retrofit2.http.GET
import retrofit2.http.Path

data class LocationResponse(
        val latitude: Double,
        val longitude: Double,
        val timestamp: Long,
        val userId: String
)

interface LocationApiService {
    @GET("location/{userId}")
    suspend fun getLatestLocation(@Path("userId") userId: String): LocationResponse
}
