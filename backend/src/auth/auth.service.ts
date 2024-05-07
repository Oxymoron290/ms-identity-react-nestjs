import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateUser(payload: any): any {
    // Here you can add logic to validate the user. For example:
    // Check if user is in your database and return user details
    return { userId: payload.sub, username: payload.name };
  }
}
