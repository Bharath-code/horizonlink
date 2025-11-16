import { Injectable, OnModuleInit } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import Redis from 'ioredis';
import { createConnection } from 'typeorm';
import { LocationGateway } from './location.gateway';

@Injectable()
export class LocationService implements OnModuleInit {
  private readonly sqs: AWS.SQS;
  private readonly redis: Redis;
  private readonly db: any; // TypeORM connection

  constructor(private readonly locationGateway: LocationGateway) {
    this.sqs = new AWS.SQS({
      region: 'us-east-1', // Will be replaced with env variable
    });

    this.redis = new Redis({
      host: 'YOUR_REDIS_HOST', // Will be replaced with env variable
      port: 6379,
    });
  }

  async onModuleInit() {
    // This is a simplified example. In a real application, you would use TypeORM entities and repositories.
    this.db = await createConnection({
      type: 'postgres',
      host: 'YOUR_POSTGRES_HOST', // Will be replaced with env variable
      port: 5432,
      username: 'admin',
      password: 'password',
      database: 'live_location_tracker',
    });

    this.pollMessages();
  }

  async pollMessages() {
    while (true) {
      const params = {
        QueueUrl: 'YOUR_SQS_QUEUE_URL', // Will be replaced with env variable
        MaxNumberOfMessages: 10,
        WaitTimeSeconds: 20,
      };

      const response = await this.sqs.receiveMessage(params).promise();

      if (response.Messages) {
        for (const message of response.Messages) {
          const location = JSON.parse(message.Body);

          // Store in Redis
          await this.redis.set(`location:${location.userId}`, JSON.stringify(location));

          // Store in PostgreSQL
          await this.db.query('INSERT INTO locations (userId, latitude, longitude) VALUES ($1, $2, $3)', [location.userId, location.latitude, location.longitude]);

          // Send location update to connected clients
          this.locationGateway.sendLocationUpdate(location);

          // Delete message from queue
          await this.sqs.deleteMessage({
            QueueUrl: params.QueueUrl,
            ReceiptHandle: message.ReceiptHandle,
          }).promise();
        }
      }
    }
  }
}
