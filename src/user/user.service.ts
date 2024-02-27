import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "./user.model";
import {UserDto} from "./dto/user.dto";
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserService {
    constructor(@InjectModel(UserModel) private userRepository: typeof UserModel) {
    }


    async createUser(dto:UserDto){



       const createdUser = await this.userRepository.create({...dto, role: 'USER' })
        return createdUser
    }
    async getAllUser(){
        return this.userRepository.findAll()
    }

    async getOneUser(id:number){
        const foundUSer = await this.userRepository.findByPk(id)
        if(!foundUSer){
            throw new HttpException({message: 'пользователь не найден'},HttpStatus.BAD_REQUEST)
        }
        return foundUSer
    }

    async deleteUser(id:number){
        return this.userRepository.destroy({where: {id: id}})
    }

    async updateUSer(id: number, dto: UserDto){
        return await this.userRepository.update({password: dto.password, role: dto.role}, {where: {id: id}, returning: true})
    }


    async getUserByEmail(email: string){
            return await this.userRepository.findOne({where: {email: email}})
    }
}
