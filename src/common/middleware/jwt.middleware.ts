import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { config } from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';


config();

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : req.body.token;


    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      req['user'] = decoded;
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
