import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Post()
  // @UseGuards(AuthGuard())
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get(':userId')
  getLatest(@Param('userId') userId: string) {
    return this.locationService.getLatestLocation(userId);
  }
}
