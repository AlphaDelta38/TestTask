import {forwardRef, Module} from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {JwtModule} from "@nestjs/jwt";
import {UserModule} from "../user/user.module";

@Module({
  imports: [
      JwtModule.register({
        secret: 'lalalal',
        signOptions: {
          expiresIn: '24h'
        }
      }),
      forwardRef(()=>UserModule)
  ],
  controllers: [AuthController],
  providers: [AuthService],
    exports: [AuthService, JwtModule]
})
export class AuthModule {}
