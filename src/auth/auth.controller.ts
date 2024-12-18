import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Patch,
  Request,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { RequestWithUser } from './types/request-with-user.interface';
import { AdminSignupDto } from './dto/admin.signup.dto';
import { AdminLoginDto } from './dto/admin.login.dto';
import { UserJwtStrategy } from './strategies/user.jwt.strategy';
// import { AdminSignupDto } from './dto/admin.signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiBody({ type: SignupDto })
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.signup(
      signupDto.username,
      signupDto.email,
      signupDto.password,
      signupDto.phone,
    );
  }

  // @Post('admin-signup')
  // @ApiBody({ type: SignupDto })
  // async admin_signup(@Body() signupDto: AdminSignupDto) {
  //   return this.authService.admin_signup(
  //     signupDto.username,
  //     signupDto.email,
  //     signupDto.password,
  //   );
  // }

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @Get('profile')
  @UseGuards(UserJwtStrategy)
  @ApiBearerAuth() // Specify the bearer token requirement
  async getProfile(@Request() req): Promise<any> {
    const userId = req.user.id;
    return this.authService.getProfile(userId);
  }

  @UseGuards(UserJwtStrategy)
  @Patch('profile')
  async updateProfile(
    @Req() req: RequestWithUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    const userId = req.user.id;
    return this.authService.updateProfile(userId, updateProfileDto);
  }

  @Post('admin-signup')
  async adminSignup(@Body() AdminDto: AdminSignupDto) {
    // const { username, email, password } = body;
    return this.authService.adminSignup(
      AdminDto.username,
      AdminDto.email,
      AdminDto.password,
    );
  }

  @Post('admin-login')
  async adminLogin(@Body() LoginDto: AdminLoginDto) {
    return this.authService.adminLogin(LoginDto.email, LoginDto.password);
  }
}
