import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserDto: CreateUserDto): { message: string } {
    const newUser: User = {
      id: this.users.length + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return { message: `User ${newUser.username} created successfully` };
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }

  update(username: string, updateUserDto: UpdateUserDto): { message: string } {
    const userIndex = this.users.findIndex(user => user.username === username);
    if (userIndex > -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...updateUserDto };
      return { message: `User ${username} updated successfully` };
    }
    return { message: 'User not found' };
  }

  remove(username: string): { message: string } {
    const initialLength = this.users.length;
    this.users = this.users.filter(user => user.username !== username);
    if (this.users.length < initialLength) {
      return { message: `User ${username} removed successfully` };
    }
    return { message: 'User not found' };
  }
}
