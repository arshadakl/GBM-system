import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAdminGuard } from 'src/auth/guards/admin.jwt.guard';

@Controller('admin')
export class AdminController {
  @Get('dashboard')
  @UseGuards(JwtAdminGuard)
  getAdminDashboard() {
    return { message: 'Admin Dashboard' };
  }
}
