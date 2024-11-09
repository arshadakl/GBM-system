// import { Module } from '@nestjs/common';
// import { MongooseModule } from '@nestjs/mongoose';
// import { JwtModule } from '@nestjs/jwt';
// import { PassportModule } from '@nestjs/passport';
// import { AuthController } from './auth.controller';
// import { AuthService } from './auth.service';
// import { UserModule } from 'src/users/user.module';
// import { User, UserSchema } from './schemas/user.schema';
// import { AdminModule } from 'src/admins/admin.module';
// import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';
// import { UserJwtStrategy } from './strategies/user-jwt.strategy';

// @Module({
//   imports: [
//     MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
//     PassportModule,
//     UserModule,
//     AdminModule,
//     JwtModule.register({
//       secret: process.env.USER_JWT_SECRET,
//       signOptions: { expiresIn: '1h' },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, UserJwtStrategy, AdminJwtStrategy],
// })
// export class AuthModule {}

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/users/user.module';
import { User, UserSchema } from './schemas/user.schema';
import { AdminModule } from 'src/admins/admin.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserJwtStrategy } from './strategies/user.jwt.strategy';
import { AdminJwtStrategy } from './strategies/admin.jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule,
    UserModule,
    AdminModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserJwtStrategy, AdminJwtStrategy],
})
export class AuthModule {}
