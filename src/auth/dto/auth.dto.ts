class GenerateAuthDTO {
  cCode: string;
  phone: string;
};

class VerifyAuthDTO {
  id: string;
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
  cCode: string;
  phone: string;
  otpId: string;
  access_token: string;
  refresh_token: string;
  authenticated: Boolean;
};

class RefreshAuthDTO {
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