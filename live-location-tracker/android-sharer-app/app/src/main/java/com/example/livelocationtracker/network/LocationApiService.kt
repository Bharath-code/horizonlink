package com.example.livelocationtracker.network

import com.example.livelocationtracker.worker.LocationRequest
import retrofit2.http.Body
import retrofit2.http.POST

interface LocationApiService {
    @POST("location")
    suspend fun sendLocation(@Body locationRequest: LocationRequest)
}
