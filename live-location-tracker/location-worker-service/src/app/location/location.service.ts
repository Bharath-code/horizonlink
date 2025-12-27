import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { LocationGateway } from './location.gateway';

@Injectable()
export class LocationService implements OnModuleInit {
  private readonly logger = new Logger(LocationService.name);

  // In-memory storage for MVP
  private readonly latestLocations = new Map<string, any>();
  private readonly locationHistory = new Map<string, any[]>();

  constructor(private readonly locationGateway: LocationGateway) { }

  async onModuleInit() {
    this.logger.log('Location Worker Service initialized (MVP mode - in-memory storage)');
    this.logger.log('For production, configure PostgreSQL, Redis, and SQS');
  }

  /**
   * Process a location update
   */
  async processLocation(location: { userId: string; latitude: number; longitude: number; accuracy?: number }) {
    const timestamp = Date.now();
    const locationWithTimestamp = { ...location, timestamp };

    // Store latest location
    this.latestLocations.set(location.userId, locationWithTimestamp);

    // Add to history
    const history = this.locationHistory.get(location.userId) || [];
    history.push(locationWithTimestamp);

    // Keep only last 100 entries per user
    if (history.length > 100) {
      history.shift();
    }
    this.locationHistory.set(location.userId, history);

    // Send location update to connected WebSocket clients
    this.locationGateway.sendLocationUpdate(locationWithTimestamp);

    this.logger.log(`Location processed for user ${location.userId}: (${location.latitude}, ${location.longitude})`);

    return { status: 'success', location: locationWithTimestamp };
  }

  /**
   * Get latest location for a user
   */
  getLatestLocation(userId: string) {
    return this.latestLocations.get(userId) || null;
  }

  /**
   * Get location history for a user
   */
  getLocationHistory(userId: string, limit = 50) {
    const history = this.locationHistory.get(userId) || [];
    return history.slice(-limit);
  }

  /**
   * Get all tracked users
   */
  getTrackedUsers() {
    return Array.from(this.latestLocations.keys());
  }
}
