// import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';

// @Injectable()
// export class AdminJwtStrategy extends PassportStrategy(Strategy, 'admin-jwt') {
//   constructor(private readonly jwtService: JwtService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       secretOrKey: process.env.USER_JWT_SECRET,
//     });
//   }

//   async validate(payload: any) {
//     return { adminId: payload.sub, email: payload.email, role: payload.role };
//   }
// }
