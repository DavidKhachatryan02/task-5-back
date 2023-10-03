import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async createUser(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }

  @Get('/getUsers')
  async findAll() {
    return this.authService.findAll();
  }

  @Get('/getUser/:id')
  async findUser(@Param('id') id: string) {
    return this.authService.findUser(+id);
  }

  @Delete('/deleteUser/:id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(+id);
  }
}
