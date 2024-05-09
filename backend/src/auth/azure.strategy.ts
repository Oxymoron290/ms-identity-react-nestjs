import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { BearerStrategy, ITokenPayload } from 'passport-azure-ad';
import { AuthService } from './auth.service';

@Injectable()
export class AzureStrategy extends PassportStrategy(BearerStrategy, 'azure-ad') {
  constructor(private authService: AuthService) {
    super({
      identityMetadata: `https://login.microsoftonline.com/YOUR_TENANT_ID/v2.0/.well-known/openid-configuration`,
      clientID: 'YOUR_CLIENT_ID',
      validateIssuer: true,
      issuer: undefined,
      passReqToCallback: false,
      loggingLevel: 'warn',
      loggingNoPII: false
    });
  }

  async validate(response: ITokenPayload): Promise<any> {
    const user = this.authService.validateUser(response);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export const AzureADGuard = AuthGuard('azure-ad');
