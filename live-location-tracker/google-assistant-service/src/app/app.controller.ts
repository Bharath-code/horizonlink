import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHealth() {
    return {
      service: 'google-assistant-service',
      status: 'healthy',
      message: 'Google Assistant webhook service is running'
    };
  }

  @Post('/webhook')
  handleWebhook(@Body() body: any) {
    // Extract user info from Dialogflow request
    const userName = body?.sessionInfo?.parameters?.userName || 'User';

    // In a real application, you would query Redis for the user's location
    // For MVP, return mock data
    const location = "Downtown, San Francisco";
    const eta = "10 minutes";
    const lastUpdated = new Date().toISOString();

    return {
      fulfillment_response: {
        messages: [
          {
            text: {
              text: [
                `${userName} is at ${location} and is approximately ${eta} away. Last updated: ${lastUpdated}`
              ]
            }
          }
        ]
      }
    };
  }
}
