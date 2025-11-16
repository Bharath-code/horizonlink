package com.example.livelocationtracker.network

import com.example.livelocationtracker.ui.auth.SignInRequest
import com.example.livelocationtracker.ui.auth.SignUpRequest
import com.example.livelocationtracker.ui.auth.AuthResponse
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthApiService {
    @POST("auth/signup")
    suspend fun signUp(@Body signUpRequest: SignUpRequest): AuthResponse

    @POST("auth/signin")
    suspend fun signIn(@Body signInRequest: SignInRequest): AuthResponse
}
