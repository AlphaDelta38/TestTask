import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAuthGuard implements CanActivate{

    constructor(private jwtService: JwtService) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest()
        try {
            const AuthHeader = req.headers.authorization
            const bearer = AuthHeader.split(' ')[0]
            const token = AuthHeader.split(' ')[1]

            if(bearer !== 'Bearer' && !token){
                throw new HttpException({message: "Пользователь не авторизован"}, HttpStatus.BAD_REQUEST)

            }
            const user = this.jwtService.verify(token)
            req.user = user

            return true
        }catch (e) {
            throw new HttpException({message: "Пользователь не авторизован"}, HttpStatus.BAD_REQUEST)
        }
    }


}