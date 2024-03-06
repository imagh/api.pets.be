import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OTPService } from 'src/otp/otp.service';
import { UserService } from 'src/user/user.service';
import { Auth, AuthDocument } from './schemas/auth.schema';
import mongoose, { Model } from 'mongoose';
import { GenerateAuthDTO, ReqUserDTO, VerifyAuthDTO, VerifyAuthRespDTO } from './dto/auth.dto';
import { TokenService } from 'src/token/token.service';

const anHour = 1000 * 60 * 60;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name, "auth")
    private readonly authModel: Model<Auth>,
    @Inject(OTPService)
    private readonly otpService: OTPService,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(TokenService)
    private readonly tokenService: TokenService
  ) {}

  async findOne(query = {}, projection = {}): Promise<AuthDocument> {
    projection = Object.assign({ _id: 0 }, projection);
    return this.authModel.findOne(query, projection);
  }

  async generate(generateAuthDto: GenerateAuthDTO): Promise<string> {
    const otpId = await this.otpService.generate('register');
    const authInput = {
      id: new mongoose.Types.ObjectId().toString(),
      cCode: generateAuthDto.cCode,
      phone: generateAuthDto.phone,
      otpId
    };
    
    const auth = new this.authModel(authInput);
    let generatedAuth = await auth.save();
    return generatedAuth.id;
  }

  async verify(id: string, verifyAuthDto: VerifyAuthDTO): Promise<VerifyAuthRespDTO> {
    // TODO: initiate transaction

    // fetch auth request
    let auth = await this.findOne({ id });
    if (!auth || auth.authenticated) {
      throw new BadRequestException("Invalid auth ID");
    }
    // validate OTP
    let validOTP = await this.otpService.validate(auth.otpId, verifyAuthDto.otp);

    if (!validOTP) {
      throw new UnauthorizedException("Incorrect OTP");
    }
    // fetch user
    let user = await this.userService.findOneByQuery({
      cCode: auth.cCode, phone: auth.phone
    });
    if (!user) {
      // create user if doesn't exist
      user = await this.userService.create({
        cCode: auth.cCode, phone: auth.phone, phoneVerified: true
      });
    }
    auth.authenticated = true;
    // update auth request
    await this.authModel.updateOne(auth.toJSON()).exec();

    // create tokens
    return this.tokenService.generate(auth, user);
  }

  async refresh(refresh_token: string): Promise<VerifyAuthRespDTO> {
    if (!refresh_token) {
      throw new BadRequestException("refresh_token is mandatory.");
    }
    return this.tokenService.refresh(refresh_token);
  }

  async signout(reqUser: ReqUserDTO): Promise<Boolean> {
    return this.tokenService.delete(reqUser.access_token);
  }
}
