import { Module } from '@nestjs/common';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { SharedAuthModule } from '@live-location-tracker/shared-auth';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [SharedAuthModule, PassportModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
