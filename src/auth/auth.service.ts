import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UserService } from 'src/users/user.service';
import { User, UserDocument } from './schemas/user.schema';
import { AdminService } from 'src/admins/admin.service';
import { Admin, AdminDocument } from 'src/admins/schemas/admin.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Admin.name) private adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly adminService: AdminService,
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

    const token = this.generateUserToken(newUser);
    return { username: newUser.username, email: newUser.email, token };
  }

  async login(username: string, password: string) {
    const user = await this.userModel.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const token = this.generateUserToken(user);
    return { username: user.username, email: user.email, token };
  }

  // Admin signup
  // async admin_signup(username: string, email: string, password: string) {
  //   if (!username || !email || !password) {
  //     throw new BadRequestException('Please fill all fields');
  //   }

  //   const existingUser = await this.userModel.findOne({
  //     $or: [{ email }, { username }],
  //   });
  //   if (existingUser) {
  //     throw new BadRequestException('Email or username already exists');
  //   }

  //   const hashedPassword = await bcrypt.hash(password, 20);
  //   const newAdmin = new this.adminModel({
  //     username,
  //     email,
  //     password: hashedPassword,
  //   });

  //   await newAdmin.save();

  //   const token = this.adminGenerateToken(newAdmin);
  //   return { username: newAdmin.username, email: newAdmin.email, token };
  // }

  async adminSignup(username: string, email: string, password: string) {
    return this.adminService.createAdmin(username, email, password);
  }

  async adminLogin(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const admin = await this.adminService.findByEmail(email);
    console.log(admin);

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    // const payload = {
    //   email: admin.email,
    //   // sub: admin._id,
    //   role: admin.role,
    // };
    // const accessToken = this.jwtService.sign(payload);
    const accessToken = await this.generateAdminToken(admin);

    return { accessToken };
  }

  // generateToken(user: any) {
  //   const payload = { username: user.username, sub: user._id };
  //   const secret = process.env.JWT_SECRET;

  //   if (!secret) {
  //     throw new Error('JWT_SECRET is not defined');
  //   }

  //   return this.jwtService.sign(payload, { secret, expiresIn: '5h' });
  // }

  // adminGenerateToken(admin: any) {
  //   const payload = {
  //     username: admin.username,
  //     sub: admin._id,
  //     role: admin.role,
  //   };
  //   const secret = process.env.JWT_SECRET + process.env.JWT_SECRET;

  //   if (!secret) {
  //     throw new Error('JWT_SECRET is not defined');
  //   }

  //   return this.jwtService.sign(payload, { secret, expiresIn: '1h' });
  // }

  async generateUserToken(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    return this.jwtService.sign(payload, {
      secret: process.env.USER_JWT_SECRET,
    });
  }

  async generateAdminToken(admin: any) {
    const payload = { email: admin.email, sub: admin._id, role: admin.role };
    return this.jwtService.sign(payload, {
      secret: process.env.USER_JWT_SECRET,
    });
  }

  async updateProfile(
    userId: string,
    UpdateProfileDto: UpdateProfileDto,
  ): Promise<User> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { email, phone } = UpdateProfileDto;
    const updatedData = { email, phone };
    const newData = await this.userService.updateProfile(userId, updatedData);
    newData.password = undefined;
    return newData;
  }

  async getProfile(userId: string): Promise<User> {
    console.log(userId);
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new Error('User not found');
    }
    user.password = undefined;
    return user;
  }
}
