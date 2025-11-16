import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LocationModule } from './location.module';
import { LocationService } from './location/location.service';
import { LocationGateway } from './location/location.gateway';

@Module({
  imports: [LocationModule],
  controllers: [AppController],
  providers: [AppService, LocationService, LocationGateway],
})
export class AppModule {}
