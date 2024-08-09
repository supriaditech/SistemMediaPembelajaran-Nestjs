import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { UpdateUserDto } from './Dto/UpdateUserDto';
import { buildResponse } from 'helper/buildResponse';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(AuthGuard, RolesGuard)
  @Post('all')
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @UseGuards(AuthGuard)
  @Post('update')
  async updateUser(@Body() data: UpdateUserDto) {
    const updatedUser = await this.userService.updateUser(data);
    return buildResponse(
      updatedUser,
      'User profile updated successfully',
      HttpStatus.OK,
    );
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Post('delete')
  async deleteUser(@Body('id') id: number) {
    const result = await this.userService.deleteUser(id);
    return buildResponse(result, 'User deleted successfully', HttpStatus.OK);
  }
}
