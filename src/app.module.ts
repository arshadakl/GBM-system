import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { GroundModule } from './grounds/ground.module';
// import { Admin } from './admins/schemas/admin.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    GroundModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
