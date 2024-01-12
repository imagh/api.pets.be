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

export { GenerateAuthDTO, VerifyAuthDTO, GenerateAuthRespDTO };