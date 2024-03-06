import { IsString } from "class-validator";

class UpdateRoleDTO {
  @IsString()
  userId: string;

  @IsString()
  role: string;
};

export { UpdateRoleDTO };