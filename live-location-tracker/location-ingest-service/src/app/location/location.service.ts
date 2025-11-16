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

  async create(createLocationDto: CreateLocationDto) {
    const params = {
      MessageBody: JSON.stringify(createLocationDto),
      QueueUrl: 'YOUR_SQS_QUEUE_URL', // Will be replaced with env variable
    };

    return this.sqs.sendMessage(params).promise();
  }
}
