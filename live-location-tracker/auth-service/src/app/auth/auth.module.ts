import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SharedAuthModule } from '@live-location-tracker/shared-auth';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [SharedAuthModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
