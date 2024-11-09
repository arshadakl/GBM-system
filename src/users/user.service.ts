import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateProfileDto } from 'src/auth/dto/update-profile.dto';
import { User, UserDocument } from 'src/auth/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findById(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec();
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const updatedUser = await this.userModel
      .findByIdAndUpdate(userId, { $set: updateProfileDto }, { new: true })
      .exec();

    if (!updatedUser) {
      throw new Error('User not found');
    }

    return updatedUser;
  }
}
