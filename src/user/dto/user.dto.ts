import { IsBoolean, IsString } from "class-validator";

class RegisterUserDTO {
  @IsString()
  cCode: string;

  @IsString()
  phone: string;

  @IsBoolean()
  phoneVerified: Boolean;
};

class CreateUserDTO {
  @IsString()
  cCode: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
};

class UpdateUserDTO {
  @IsString()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
};

class MarkPhoneVerified {
  @IsBoolean()
  phoneVerified: Boolean;
}

export { RegisterUserDTO, CreateUserDTO, UpdateUserDTO, MarkPhoneVerified };