import { IsBoolean, IsString } from "class-validator";

class GenerateAuthDTO {
  @IsString()
  cCode: string;

  @IsString()
  phone: string;
};

class VerifyAuthDTO {
  @IsString()
  otp: string;
};

class GenerateAuthRespDTO {
  id: string;
};

class VerifyAuthRespDTO {
  access_token: string;
  refresh_token: string;
};

class UpdateAuthDTO {
  @IsString()
  cCode: string;

  @IsString()
  phone: string;

  @IsString()
  otpId: string;

  @IsString()
  access_token: string;

  @IsString()
  refresh_token: string;

  @IsBoolean()
  authenticated: Boolean;
};

class RefreshAuthDTO {
  @IsString()
  refresh_token: string;
};

class ReqUserDTO {
  id:string;
  access_token: string;
  roles: string[];
};

export {
  GenerateAuthDTO,
  VerifyAuthDTO,
  GenerateAuthRespDTO,
  VerifyAuthRespDTO,
  UpdateAuthDTO,
  RefreshAuthDTO,
  ReqUserDTO
};