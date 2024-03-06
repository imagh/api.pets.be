import { BadRequestException, Inject, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './schemas/token.schema';
import mongoose, { Model } from 'mongoose';
import { TokenRespDTO } from './dto/token.dto';
import { JwtService } from '@nestjs/jwt';
import { Auth } from 'src/auth/interfaces/auth.interface';
import { User } from 'src/user/interfaces/user.interface';

const anHour = 1000 * 60 * 60;

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name, "auth")
    private readonly tokenModel: Model<Token>,
    @Inject(JwtService)
    private readonly jwtService: JwtService
  ) {}

  async findOne(query = {}, projection = {}): Promise<TokenDocument> {
    projection = Object.assign({ _id: 0 }, projection);
    return this.tokenModel.findOne(query, projection);
  }

  async generate(auth: Auth, user: User): Promise<TokenRespDTO> {
    // TODO: initiate transaction

    if (!auth || !auth.id) {
      throw new BadRequestException("Please provide correct auth request.");
    }
    if (!auth.authenticated) {
      throw new BadRequestException("Cannot generate token without authentication.");
    }
    if (!user || !user.id) {
      throw new BadRequestException("Cannot generate token without a user.");
    }

    let token = new this.tokenModel({
      id: new mongoose.Types.ObjectId().toString(),
      authId: auth.id,
      userId: user.id,
      access_token: await this.jwtService.signAsync({
        user: user.id,
        auth: auth.id,
        expiry: Date.now() + anHour
      }),
      refresh_token: await this.jwtService.signAsync({
        user: user.id,
        auth: auth.id,
        cCode: user.cCode,
        phone: user.phone
      })
    });
    // update auth request
    await token.save();

    return {
      access_token: token.access_token,
      refresh_token: token.refresh_token
    };
  }

  async refresh(refresh_token: string): Promise<TokenRespDTO> {
    if (!refresh_token) {
      throw new BadRequestException("refresh_token is mandatory.");
    }
    // fetch auth request
    let token = await this.tokenModel.findOne({ refresh_token });
    // refresh token
    token.access_token = await this.jwtService.signAsync({
      user: token.userId,
      auth: token.authId,
      expiry: Date.now() + anHour
    });
    // update auth request
    await token.updateOne(token.toJSON()).exec();
    return {
      access_token: token.access_token,
      refresh_token: token.refresh_token
    };
  }

  async delete(access_token: string): Promise<Boolean> {
    await this.tokenModel.deleteOne({ access_token });
    return true;
  }
}
