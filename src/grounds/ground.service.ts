import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGroundDto } from './dto/create-ground.dto';
import { Ground, GroundDocument } from './ground.schema';

@Injectable()
export class GroundService {
  constructor(
    @InjectModel(Ground.name)
    private readonly groundModel: Model<GroundDocument>,
  ) {}

  async createGround(createGroundDto: CreateGroundDto): Promise<Ground> {
    const newGround = new this.groundModel(createGroundDto);
    return newGround.save();
  }

  async findAll(): Promise<Ground[]> {
    return this.groundModel.find().exec();
  }

  async findById(id: string): Promise<Ground> {
    return this.groundModel.findById(id).exec();
  }
}
