import { applyDecorators, UseGuards } from '@nestjs/common';

import { Roles } from './roles.decorator';
import { RoleGuard } from '../guards/roles.guard';
import { AdminJwtStrategy } from '../strategies/admin.jwt.strategy';

export function AdminOnly() {
  return applyDecorators(
    Roles('admin'),
    UseGuards(AdminJwtStrategy, RoleGuard), // Ensure `AdminJwtStrategy` runs first
  );
}
