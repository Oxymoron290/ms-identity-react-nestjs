import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AzureStrategy } from './azure.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'oauth-bearer' })],
  providers: [AuthService, AzureStrategy],
  exports: [AuthService]
})
export class AuthModule {}
