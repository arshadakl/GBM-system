import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Patch,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.username, loginDto.password);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth() // Specify the bearer token requirement
  async getProfile(@Request() req): Promise<any> {
    const userId = req.user._id; // Assume JWT token contains the user ID
    return this.authService.getProfile(userId);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async updateProfile(
    @Request() req,
    @Body() updateProfileDto: UpdateProfileDto,
  ): Promise<any> {
    const userId = req.user._id; // Get the userId from the JWT token
    return this.authService.updateProfile(userId, updateProfileDto);
  }
}
