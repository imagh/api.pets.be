import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { RegisterUserDTO } from "./dto/users.dto";
import { User } from "./schemas/users.schema";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findById(id: string): Promise<User> {
    let objectId = new mongoose.Types.ObjectId(id);

    if (!mongoose.isValidObjectId(objectId)) {
      throw new BadRequestException("Please provide correct id.");
    }

    let user = await this.userModel.findOne({ id: objectId }, { _id: 0 }).exec();

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return user;
  }

  async findByQuery(query = {}): Promise<User[]> {
    return this.userModel.find(query, { _id: 0 }).exec();
  }

  async findAll(): Promise<User[]> {
    return this.findByQuery({});
  }

  async create(registerUserDto: RegisterUserDTO): Promise<User> {
    const registeredUser = new this.userModel(registerUserDto);
    return registeredUser.save();
  }
}