import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import * as AWS from 'aws-sdk';

@Injectable()
export class LocationService {
  private readonly sqs: AWS.SQS;

  constructor() {
    this.sqs = new AWS.SQS({
      region: 'us-east-1', // Will be replaced with env variable
    });
  }

  private latestLocations = new Map<string, any>();

  async create(createLocationDto: CreateLocationDto) {
    console.log('Received location:', createLocationDto);
    // Store in memory for Phase 3 testing
    // In a real app, userId would come from the auth token
    const userId = 'test-user';
    this.latestLocations.set(userId, {
      ...createLocationDto,
      timestamp: Date.now(),
      userId
    });

    return { status: 'success', data: createLocationDto };
  }

  async getLatestLocation(userId: string) {
    return this.latestLocations.get(userId) || null;
  }
}
