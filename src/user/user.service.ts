import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RegisterUserDTO, UpdateUserDTO } from "./dto/user.dto";
import { User } from "./schemas/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name, "core")
    private readonly userModel: Model<User>
  ) {}

  async findById(id: string): Promise<User> {
    let user = await this.userModel.findOne({ id }, { _id: 0 }).exec();

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return user;
  }

  async findOneByQuery(query = {}): Promise<User> {
    return this.userModel.findOne(query, { _id: 0 }).exec();
  }

  async findByQuery(query = {}): Promise<User[]> {
    return this.userModel.find(query, { _id: 0 }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.findByQuery({});
  }

  async create(registerUserDto: RegisterUserDTO): Promise<User> {
    const registeredUser = new this.userModel(Object.assign({
      id: new mongoose.Types.ObjectId().toString()
    }, registerUserDto));
    console.log(registeredUser);
    
    return registeredUser.save();
  }

  async update(updateUserDto: UpdateUserDTO): Promise<User> {
    const updatedUser = new this.userModel(updateUserDto);
    // TODO: pass update query
    return updatedUser.updateOne().exec();
  }
}