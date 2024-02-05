import { Body, Controller, Get, Param, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDTO } from './dto/users.dto';
import { User } from "./schemas/users.schema";
import { Roles } from 'src/roles/decorators/roles.decorator';
import { Role } from 'src/roles/enums/roles.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.findById(req.user.id);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  async findById(@Param() params: any): Promise<User> {
    return this.usersService.findById(params.id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Body() updateUserDto: UpdateUserDTO): Promise<User> {
    return this.usersService.update(updateUserDto);
  }

  // @Post()
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async create(@Body() createUserDto: CreateUserDTO): Promise<User> {
  //   return this.usersService.create(createUserDto);
  // }
}
