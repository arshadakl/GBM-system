import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { GroundService } from './ground.service';
import { CreateGroundDto } from './dto/create-ground.dto';
// import { AdminJwtStrategy } from 'src/auth/strategies/admin.jwt.strategy';
// import { RoleGuard } from 'src/auth/guards/roles.guard';
import { AdminOnly } from 'src/auth/decorators/admin-only.decorator';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { RoleGuard } from 'src/auth/guards/roles.guard';
// import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ground')
export class GroundController {
  constructor(private readonly groundService: GroundService) {}

  // @UseGuards(AdminJwtStrategy, RoleGuard)
  @Post()
  @UseGuards(AdminGuard, RoleGuard)
  @AdminOnly()
  async createGround(@Body() createGroundDto: CreateGroundDto) {
    return this.groundService.createGround(createGroundDto);
  }

  @Get()
  async getAllGrounds() {
    return this.groundService.findAll();
  }

  @Get(':id')
  async getGroundById(@Param('id') id: string) {
    return this.groundService.findById(id);
  }
}
