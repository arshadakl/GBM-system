// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Admin, AdminDocument } from 'src/auth/schemas/admin.schema';
// // import { UpdateProfileDto } from 'src/auth/dto/update-profile.dto';

// @Injectable()
// export class AdminService {
//   constructor(
//     @InjectModel(Admin.name) private AdminModel: Model<AdminDocument>,
//   ) {}

//   async findById(userId: string): Promise<Admin> {
//     return this.AdminModel.findById(userId).exec();
//   }

// }

import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin, AdminDocument } from './schemas/admin.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
  ) {}

  async createAdmin(
    username: string,
    email: string,
    password: string,
  ): Promise<Admin> {
    const existingAdmin = await this.adminModel.findOne({ email }).exec();
    if (existingAdmin) {
      throw new ConflictException('Admin with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new this.adminModel({
      username,
      email,
      password: hashedPassword,
    });
    return admin.save();
  }

  async findByEmail(email: string): Promise<Admin> {
    const admin = await this.adminModel.findOne({ email }).exec();
    if (!admin) {
      throw new NotFoundException('Admin not found.');
    }
    return admin;
  }

  async findById(id: string): Promise<Admin> {
    const admin = await this.adminModel.findById(id).exec();
    if (!admin) {
      throw new NotFoundException('Admin not found.');
    }
    return admin;
  }
}
