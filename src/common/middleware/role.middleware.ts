import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const user = req['user'];

    if (!user || !user.role) {
      throw new ForbiddenException('Role information missing');
    }

    
    if (user.role !== 'commander') {
      throw new ForbiddenException('Access denied: insufficient role');
    }

    next();
  }
}
