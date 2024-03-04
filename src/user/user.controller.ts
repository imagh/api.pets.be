import { Body, Controller, Get, Param, Post, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO } from './dto/user.dto';
import { User } from "./schemas/user.schema";

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) { }

  @Get('profile')
  async getProfile(@Request() req) {
    return this.userService.findById(req.user.id);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  async findById(@Param() params: any): Promise<User> {
    return this.userService.findById(params.id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Body() updateUserDto: UpdateUserDTO): Promise<User> {
    return this.userService.update(updateUserDto);
  }

  // @Post()
  // @UsePipes(new ValidationPipe({ transform: true }))
  // async create(@Body() createUserDto: CreateUserDTO): Promise<User> {
  //   return this.userService.create(createUserDto);
  // }
}
