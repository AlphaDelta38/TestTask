import {Body, Controller, HttpException, HttpStatus, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {UserDto} from "../user/dto/user.dto";

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }


    @Post('/login')
    login(@Body() dto: UserDto){
        if(!dto.email || !dto.password){
            throw new HttpException({message: 'Заполните все поля'},HttpStatus.BAD_REQUEST)
        }
        return this.authService.login(dto)
    }


    @Post('/registration')
    registration(@Body() dto: UserDto){
            if(!dto.email || !dto.password){
                throw new HttpException({message: 'Заполните все поля'},HttpStatus.BAD_REQUEST)
            }
            return this.authService.registration(dto)


    }

}
