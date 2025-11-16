import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location.module';
import { LocationController } from './location/location.controller';
import { LocationService } from './location/location.service';

@Module({
  imports: [LocationModule],
  controllers: [AppController, LocationController],
  providers: [AppService, LocationService],
})
export class AppModule {}
