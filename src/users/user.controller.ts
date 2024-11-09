import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserGuard } from '../auth/guards/user.guard';

@Controller('user')
export class UserController {
  @Get('profile')
  @UseGuards(UserGuard)
  getUserProfile() {
    return { message: 'User Profile' };
  }
}
