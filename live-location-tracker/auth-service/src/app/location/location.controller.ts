import { Controller, Post, Body, Get, Param } from '@nestjs/common';

export class CreateLocationDto {
    latitude: number;
    longitude: number;
    accuracy?: number;
    userId?: string;
}

@Controller('location')
export class LocationController {
    // In-memory storage for MVP
    private latestLocations = new Map<string, any>();

    @Post()
    create(@Body() createLocationDto: CreateLocationDto) {
        const userId = createLocationDto.userId || 'default-user';
        const locationData = {
            ...createLocationDto,
            userId,
            timestamp: Date.now(),
        };

        this.latestLocations.set(userId, locationData);
        console.log('Location received:', locationData);

        return { status: 'success', data: locationData };
    }

    @Get(':userId')
    getLatest(@Param('userId') userId: string) {
        return this.latestLocations.get(userId) || null;
    }
}
