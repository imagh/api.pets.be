import { Injectable } from "@nestjs/common";
import { Role } from "./schemas/role.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UpdateRoleDTO } from "./dto/role.dto";

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name, "auth")
    private readonly roleModel: Model<Role>
  ) {}

  async findOneByQuery(query = {}): Promise<Role> {
    return this.roleModel.findOne(query, { _id: 0 }).exec();
  }

  async findByQuery(query = {}): Promise<Role[]> {
    return this.roleModel.find(query, { _id: 0 }).exec();
  }

  async findAll(): Promise<Role[]> {
    return this.findByQuery({});
  }

  async create(createRoleDTO: UpdateRoleDTO): Promise<Role> {
    const newRole = new this.roleModel(createRoleDTO);
    
    return newRole.save();
  }

  async update(updateRoleDTO: UpdateRoleDTO): Promise<Role> {
    const updatedRole = new this.roleModel(updateRoleDTO);
    return updatedRole.updateOne().exec();
  }
}