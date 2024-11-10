// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
// import { UserService } from 'src/users/user.service';

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//   constructor(
//     private readonly jwtService: JwtService,
//     private readonly userService: UserService,
//   ) {
//     super({
//       secretOrKey: process.env.JWT_SECRET,
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     });
//   }

//   async validate(payload: { sub: string; email: string; role: string }) {
//     return { userId: payload.sub, email: payload.email, role: payload.role };
//   }
// }

// import { Injectable } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
//   constructor() {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.USER_JWT_SECRET, // Use user-specific secret
//     });
//   }

//   async validate(payload: any) {
//     return { userId: payload.sub, email: payload.email, role: payload.role };
//   }
// }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from 'src/users/user.service';

@Injectable()
export class UserJwtStrategy extends PassportStrategy(Strategy, 'user-jwt') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  // async validate(payload: any) {
  //   return { userId: payload.sub, email: payload.email, role: payload.role };
  // }

  async validate(payload: any) {
    const user = await this.userService.findById(payload.sub);
    console.log(user);
    
    if (!user) {
      throw new UnauthorizedException();
    }
    return user; // Attach user data to request
  }
}
