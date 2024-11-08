import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schemas/user.schema';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signup(
    username: string,
    email: string,
    password: string,
    phone: string,
  ) {
    if (!username || !email || !password || !phone) {
      throw new BadRequestException('Please fill all fields');
    }

    const existingUser = await this.userModel.findOne({
      $or: [{ email }, { phone }, { username }],
    });
    if (existingUser) {
      throw new BadRequestException('Email, phone, or username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    const token = this.generateToken(newUser);
    return { username: newUser.username, email: newUser.email, token };
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = this.generateToken(user);
    return { username: user.username, email: user.email, token };
  }

  generateToken(user: any) {
    const payload = { username: user.username, sub: user._id };
    const secret = process.env.JWT_SECRET; // This should access the JWT_SECRET from the .env file

    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    return this.jwtService.sign(payload, { secret, expiresIn: '1h' });
  }

  async updateProfile(
    userId: string,
    updateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      { $set: updateProfileDto },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      throw new Error('User not found');
    }
    return updatedUser;
  }

  async getProfile(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}
