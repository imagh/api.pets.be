import { Body, Controller, Delete, Param, Post, Request, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GenerateAuthDTO, GenerateAuthRespDTO, RefreshAuthDTO, VerifyAuthDTO, VerifyAuthRespDTO } from './dto/auth.dto';
import { SkipAuth } from 'src/decorators/skip-auth.decorator';
import { ResponseMessage } from 'src/decorators/responseMessage.decorator';
import { TransformationInterceptor } from 'src/interceptors/transformation.interceptor';

@Controller('auth')
@UseInterceptors(TransformationInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @ResponseMessage("Generated.")
  @Post('/generate')
  async generate(@Body() generateAuthDto: GenerateAuthDTO): Promise<GenerateAuthRespDTO> {
    console.log(generateAuthDto);
    
    let id = await this.authService.generate(generateAuthDto);
    return { id };
  }

  @SkipAuth()
  @ResponseMessage("Verified.")
  @Post('/:id/verify')
  async verify(@Param('id') id: string, @Body() verifyAuthDto: VerifyAuthDTO): Promise<VerifyAuthRespDTO> {
    return this.authService.verify(id, verifyAuthDto);
  }

  @SkipAuth()
  @ResponseMessage("Refreshed.")
  @Post('/refresh')
  async refresh(@Body() refreshAuthDto: RefreshAuthDTO): Promise<VerifyAuthRespDTO> {
    return this.authService.refresh(refreshAuthDto.refresh_token);
  }  

  @Delete('/signout')
  @ResponseMessage("Signed out.")
  async signout(@Request() req): Promise<Boolean> {
    return this.authService.signout(req.user);
  }
}
