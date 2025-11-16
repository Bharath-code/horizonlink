import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { PairDeviceDto } from './dto/pair-device.dto';
import * as AWS from 'aws-sdk';

@Injectable()
export class AuthService {
  private readonly cognito: AWS.CognitoIdentityServiceProvider;

  constructor() {
    this.cognito = new AWS.CognitoIdentityServiceProvider({
      region: 'us-east-1', // Will be replaced with env variable
    });
  }

  async signUp(signUpDto: SignUpDto) {
    const { username, email, phone_number, name } = signUpDto;

    const params = {
      ClientId: 'YOUR_COGNITO_USER_POOL_CLIENT_ID', // Will be replaced with env variable
      Password: 'Password123!', // Will be replaced with a randomly generated password
      Username: username,
      UserAttributes: [
        { Name: 'email', Value: email },
        { Name: 'phone_number', Value: phone_number },
        { Name: 'name', Value: name },
      ],
    };

    return this.cognito.signUp(params).promise();
  }

  async signIn(signInDto: SignInDto) {
    const { username } = signInDto;

    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: 'YOUR_COGNITO_USER_POOL_CLIENT_ID', // Will be replaced with env variable
      AuthParameters: {
        USERNAME: username,
        PASSWORD: 'Password123!', // Should be obtained securely
      },
    };

    return this.cognito.initiateAuth(params).promise();
  }

  async pairDevice(pairDeviceDto: PairDeviceDto) {
    // Placeholder for pairing logic
    console.log(`Pairing device with code: ${pairDeviceDto.pairingCode}`);
    return { message: 'Device paired successfully' };
  }
}
