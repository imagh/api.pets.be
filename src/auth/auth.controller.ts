import { Body, Controller, Delete, Param, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateAuthDTO, GenerateAuthRespDTO, RefreshAuthDTO, VerifyAuthDTO, VerifyAuthRespDTO } from './dto/auth.dto';
import { SkipAuth } from 'src/decorators/skip-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @Post('/generate')
  async generate(@Body() generateAuthDto: GenerateAuthDTO): Promise<GenerateAuthRespDTO> {
    console.log(generateAuthDto);
    
    let id = await this.authService.generate(generateAuthDto);
    return { id };
  }

  @SkipAuth()
  @Post('/:id/verify')
  async verify(@Param() id: string, @Body() verifyAuthDto: VerifyAuthDTO): Promise<VerifyAuthRespDTO> {
    return this.authService.verify(id, verifyAuthDto);
  }

  @SkipAuth()
  @Post('/refresh')
  async refresh(@Body() refreshAuthDto: RefreshAuthDTO): Promise<VerifyAuthRespDTO> {
    return this.authService.refresh(refreshAuthDto.refresh_token);
  }  

  @Delete('/signout')
  async signout(@Request() req): Promise<Boolean> {
    return this.authService.signout(req.user);
  }
}
