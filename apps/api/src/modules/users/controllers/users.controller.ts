import { Controller, Get, Put, Body, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') userId: string) {
    return this.usersService.getUser(userId);
  }

  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @Put(':id/promote-to-owner')
  async promoteToFacilityOwner(@Param('id') userId: string) {
    return this.usersService.promoteToFacilityOwner(userId);
  }
}
