import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";


@Injectable()
export class UserMatchGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const id = request.params.id;
        const user = request.user;

        if(user.id !== Number(id)){
            throw new UnauthorizedException ('You are not allowed to access this resource');
        }
        return true;
    }
}