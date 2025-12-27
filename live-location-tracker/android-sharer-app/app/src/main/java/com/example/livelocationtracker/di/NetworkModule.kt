package com.example.livelocationtracker.di

import com.example.livelocationtracker.network.AuthApiService
import com.example.livelocationtracker.network.LocationApiService
import com.example.livelocationtracker.network.PairingApiService
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

@Module
@InstallIn(SingletonComponent::class)
object NetworkModule {

    @Provides
    @Singleton
    fun provideRetrofit(): Retrofit {
        return Retrofit.Builder()
                .baseUrl("https://94d59ebbc374.ngrok-free.app/") // Public ngrok URL
                .addConverterFactory(GsonConverterFactory.create())
                .build()
    }

    @Provides
    @Singleton
    fun provideAuthApiService(retrofit: Retrofit): AuthApiService {
        return retrofit.create(AuthApiService::class.java)
    }

    @Provides
    @Singleton
    fun provideLocationApiService(retrofit: Retrofit): LocationApiService {
        return retrofit.create(LocationApiService::class.java)
    }

    @Provides
    @Singleton
    fun providePairingApiService(retrofit: Retrofit): PairingApiService {
        return retrofit.create(PairingApiService::class.java)
    }
}
