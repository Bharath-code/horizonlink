import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      audience: 'YOUR_COGNITO_USER_POOL_CLIENT_ID', // Will be replaced with env variable
      issuer: 'https://cognito-idp.us-east-1.amazonaws.com/YOUR_COGNITO_USER_POOL_ID', // Will be replaced with env variable
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://cognito-idp.us-east-1.amazonaws.com/YOUR_COGNITO_USER_POOL_ID/.well-known/jwks.json`, // Will be replaced with env variable
      }),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
