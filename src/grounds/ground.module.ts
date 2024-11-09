import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroundService } from './ground.service';
import { GroundController } from './ground.controller';
import { Ground, GroundSchema } from './ground.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ground.name, schema: GroundSchema }]),
    AuthModule,
  ],
  controllers: [GroundController],
  providers: [GroundService],
})
export class GroundModule {}
