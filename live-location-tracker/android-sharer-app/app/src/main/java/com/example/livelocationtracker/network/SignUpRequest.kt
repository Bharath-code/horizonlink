package com.example.livelocationtracker.ui.auth

data class SignUpRequest(
    val username: String,
    val email: String,
    val phone_number: String,
    val name: String
)
