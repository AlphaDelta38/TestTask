import {forwardRef, Module} from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "./user.model";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports:[
      SequelizeModule.forFeature([
          UserModel,
      ]),
      forwardRef(()=>AuthModule)
  ],
  controllers: [UserController],
  providers: [UserService],
    exports: [UserService]
})
export class UserModule {}
