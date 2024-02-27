import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {UserDto} from "../user/dto/user.dto";
import {JwtService} from "@nestjs/jwt";
import {UserService} from "../user/user.service";
import * as bcrypt  from 'bcryptjs'
import {UserModel} from "../user/user.model";

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService, private userService: UserService) {
    }

    async login(dto:UserDto){
        const user = await this.userService.getUserByEmail(dto.email)
        if(!user){
            throw new HttpException({message: 'Не верный логин или пароль'},HttpStatus.BAD_REQUEST)
        }
        const passwordEqual = await bcrypt.compare(dto.password, user.password)
        if(user && passwordEqual){
            return await this.generateJwtToken(user)
        }else{
            throw new HttpException({message: 'Не верный логин или пароль'},HttpStatus.BAD_REQUEST)
        }

    }


    async registration(dto:UserDto){
            const user = await this.userService.getUserByEmail(dto.email)
            if(user){
                throw new HttpException({message: 'Пользователь с таким емайлом уже существует'},HttpStatus.BAD_REQUEST)
            }

            const hashPassword = await bcrypt.hash(dto.password, 5)
            const createdUser =await this.userService.createUser({...dto, password: hashPassword})
            return this.generateJwtToken(createdUser)
    }


    async generateJwtToken(user: UserModel){
        const  payload = {email: user.email, password: user.password, role: user.role}
        return {
            jwtToken: this.jwtService.sign(payload)
        }
    }


}
