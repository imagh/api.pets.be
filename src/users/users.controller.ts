import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/users.dto';
// import { User } from './interfaces/users.interface';
import { User } from "./schemas/users.schema";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

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
  async create(@Body() createUserDto: CreateUserDTO): Promise<User> {
    return this.usersService.create(createUserDto);
  }
}
