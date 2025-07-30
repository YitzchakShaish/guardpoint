import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':usernam')
  findOne(@Param('usernam') usernam: string) {
    return this.usersService.findOne(usernam);
  }

  @Put(':usernam')
  update(@Param('usernam') usernam: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(usernam, updateUserDto);
  }

  @Delete(':usernam')
  remove(@Param('usernam') usernam: string) {
    return this.usersService.remove(usernam);
  }
}
