// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// @Injectable()
// export class RoleGuard implements CanActivate {
//   constructor(private readonly reflector: Reflector) {}

//   canActivate(context: ExecutionContext): boolean {
//     const roles = this.reflector.get<string[]>('roles', context.getHandler());
//     if (!roles) {
//       return true;
//     }
//     const request = context.switchToHttp().getRequest();
//     const user = request.user;
//     return roles.includes(user.role);
//   }
// }

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) return true; // No roles defined means no restriction

    const request = context.switchToHttp().getRequest();
    
    const user = request.user;
    
    if (!user || !roles.includes(user.role)) {
      throw new ForbiddenException(
        `Access denied. Only ${roles.join(' or ')} can perform this action.`,
      );
    }

    return true;
  }
}
