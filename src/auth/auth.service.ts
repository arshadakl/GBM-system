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

  private generateToken(user: UserDocument): string {
    return this.jwtService.sign({ id: user._id, username: user.username });
  }
}
