import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('admin')
export class AdminController {
  @Get('dashboard')
  @UseGuards(AdminGuard)
  getAdminDashboard() {
    return { message: 'Admin Dashboard' };
  }
}
