import {Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards} from '@nestjs/common';
import {UserService} from "./user.service";
import {UserDto} from "./dto/user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('user')
export class UserController {
        constructor(private  userService: UserService) {
        }


        @Post( )
        @UseGuards(JwtAuthGuard)
        create(@Body() dto: UserDto){
                return this.userService.createUser(dto)
        }


        @Get()
        @UseGuards(JwtAuthGuard)
        getAll(){
                return this.userService.getAllUser()
        }

        @Get('/:id')
        @UseGuards(JwtAuthGuard)
        getOne(@Param('id') id:number){
                if(!id){
                        throw new HttpException({message: 'айди не указан'},HttpStatus.BAD_REQUEST)
                }
                return this.userService.getOneUser(id)
        }

        @Delete('/:id')
        @UseGuards(JwtAuthGuard)
        delete(@Param('id') id:number){
                if(!id){
                        throw new HttpException({message: 'айди не указан'},HttpStatus.BAD_REQUEST)
                }
                return this.userService.deleteUser(id)
        }

        @Put('/:id')
        @UseGuards(JwtAuthGuard)
        update(@Param('id') id:number, @Body() dto: UserDto){
                if(!id){
                        throw new HttpException({message: 'айди не указан'},HttpStatus.BAD_REQUEST)
                }
                return this.userService.updateUSer(id, dto)
        }



}
