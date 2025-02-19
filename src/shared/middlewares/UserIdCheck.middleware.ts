import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { NotFoundError } from "rxjs";



export class UserIdCheckMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id
        if (!userId) {
            throw new BadRequestException('User Id is required')
        }
        if (isNaN(Number(userId))) {
            throw new BadRequestException('User ID must be a number')
        }

        next()
    }
}