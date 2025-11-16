import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/webhook')
  handleWebhook(@Body() body: any) {
    const userName = body.sessionInfo.parameters.userName;
    // In a real application, you would query Redis for the user's location
    const location = "New York, NY";
    const eta = "15 minutes";

    return {
      fulfillment_response: {
        messages: [
          {
            text: {
              text: [
                `${userName} is at ${location} and is approximately ${eta} away.`
              ]
            }
          }
        ]
      }
    };
  }
}
