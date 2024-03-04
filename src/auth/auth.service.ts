import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OTPService } from 'src/otp/otp.service';
import { UsersService } from 'src/users/users.service';
import { Auth, AuthDocument } from './schemas/auth.schema';
import mongoose, { Model } from 'mongoose';
import { GenerateAuthDTO, ReqUserDTO, UpdateAuthDTO, VerifyAuthDTO, VerifyAuthRespDTO } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { TokensService } from 'src/tokens/tokens.service';

const anHour = 1000 * 60 * 60;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name, "auth")
    private readonly authModel: Model<Auth>,
    @Inject(OTPService)
    private readonly otpService: OTPService,
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @Inject(TokensService)
    private readonly tokensService: TokensService,
    @Inject(JwtService)
    private readonly jwtService: JwtService
  ) {}

  async findOne(query = {}): Promise<AuthDocument> {
    return this.authModel.findOne(query, { _id: 0 });
  }

  async generate(generateAuthDto: GenerateAuthDTO): Promise<string> {
    const otpId = await this.otpService.generate('register');
    const authInput = {
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
    let objectId = new mongoose.Types.ObjectId(id);

    if (!mongoose.isValidObjectId(objectId)) {
      throw new BadRequestException("Please provide correct id.");
    }
    // fetch auth request
    let auth = await this.findOne({ id: objectId });
    if (!auth || auth.authenticated) {
      throw new BadRequestException("Invalid auth ID");
    }
    // validate OTP
    let validOTP = await this.otpService.validate(auth.otpId, verifyAuthDto.otp);

    if (!validOTP) {
      throw new UnauthorizedException("Incorrect OTP");
    }
    // fetch user
    let user = await this.usersService.findOneByQuery({
      cCode: auth.cCode, phone: auth.phone
    });
    if (!user) {
      // create user if doesn't exist
      user = await this.usersService.create({
        cCode: auth.cCode, phone: auth.phone, phoneVerified: true
      });
    }
    auth.authenticated = true;
    // update auth request
    await this.authModel.updateOne(auth.toJSON()).exec();

    // create tokens
    return this.tokensService.generate(auth, user);
  }

  async refresh(refresh_token: string): Promise<VerifyAuthRespDTO> {
    if (!refresh_token) {
      throw new BadRequestException("refresh_token is mandatory.");
    }
    return this.tokensService.refresh(refresh_token);
  }

  async signout(reqUser: ReqUserDTO): Promise<Boolean> {
    return this.tokensService.delete(reqUser.access_token);
  }
}
