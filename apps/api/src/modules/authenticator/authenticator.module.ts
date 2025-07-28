import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthController } from './controllers/auth.controller';
import { AuthGuard } from './guards/auth.guard';
import { AuthProvider } from './providers/auth/auth';
import { AuthService } from './services/auth.service';

const AuthGuardProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};

@Global()
@Module({
  providers: [AuthService, AuthProvider, AuthGuardProvider],
  controllers: [AuthController],
  exports: [AuthProvider],
})
export class AuthenticatorModule { }
