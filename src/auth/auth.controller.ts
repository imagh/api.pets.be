import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateAuthDTO, GenerateAuthRespDTO, VerifyAuthDTO } from './dto/auth.dto';
import { User } from 'src/users/schemas/users.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/generate')
  async generate(@Body() generateAuthDto: GenerateAuthDTO): Promise<GenerateAuthRespDTO> {
    console.log(generateAuthDto);
    
    let id = await this.authService.generate(generateAuthDto);
    return { id };
  }

  @Post('/verify')
  async verify(@Body() verifyAuthDto: VerifyAuthDTO): Promise<{ access_token: string }> {
    // TODO: // set session, token refresh token etc.
    return this.authService.verify(verifyAuthDto);
  }
}
