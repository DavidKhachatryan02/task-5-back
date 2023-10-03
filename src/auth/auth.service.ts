import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  async createUser(body: CreateUserDto) {
    return `This action adds a new user ${body.id},${body.name}, ${body.age}`;
  }

  async findAll() {
    return `This action returns all auth`;
  }

  async findUser(id: number) {
    return `This action returns a user with id#${id} `;
  }

  async deleteUser(id: number) {
    return `This action removes a user with id#${id}`;
  }
}
