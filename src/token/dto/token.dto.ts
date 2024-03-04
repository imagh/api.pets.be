import { Auth } from "src/auth/interfaces/auth.interface";

class TokenRespDTO {
  access_token: string;
  refresh_token: string;
};

export {
  TokenRespDTO
};