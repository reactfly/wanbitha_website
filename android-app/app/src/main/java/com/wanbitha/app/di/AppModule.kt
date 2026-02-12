package com.wanbitha.app.di

import com.wanbitha.app.data.repository.ArtworkRepository
import com.wanbitha.app.data.repository.ArtworkRepositoryImpl
import dagger.Binds
import dagger.Module
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@Module
@InstallIn(SingletonComponent::class)
abstract class AppModule {

    @Binds
    @Singleton
    abstract fun bindArtworkRepository(
        impl: ArtworkRepositoryImpl
    ): ArtworkRepository
}
