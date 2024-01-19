import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { authConfig } from 'src/config';
import { USER_TOKEN } from '../constants';
import { RemoveUserTokenInput } from '../dto';
import { CreateUserTokenInput } from '../dto/create-user-token.input';
import { UpdateUserTokenInput } from '../dto/update-user-token.input';
import {
  UserToken,
  UserTokenDocument,
  UserTokenModel,
} from '../repositories/interfaces';

@Injectable()
export class UserTokenService {
  constructor(
    @InjectModel(USER_TOKEN)
    private readonly userTokenModel: Model<UserTokenDocument>,
    private readonly jwtService: JwtService,
    @Inject(authConfig.KEY)
    private readonly config: ConfigType<typeof authConfig>,
  ) {}

  create(createUserTokenInput: Partial<CreateUserTokenInput>) {
    return this.userTokenModel.create(createUserTokenInput);
  }

  findAll() {
    return this.userTokenModel.find().exec();
  }

  findOne(params: Partial<UserToken>) {
    return this.userTokenModel.findOne(params).exec();
  }

  findOneById(id: string) {
    return this.userTokenModel.findOne({ _id: id }).exec();
  }

  update(id: string, updateUserTokenInput: UpdateUserTokenInput) {
    return this.userTokenModel.findOneAndUpdate(
      { _id: id },
      { ...updateUserTokenInput.userToken },
      { returnOriginal: false },
    );
  }

  remove(id: string) {
    return this.userTokenModel.remove({ _id: id });
  }

  removeWhere(filter: Partial<RemoveUserTokenInput>) {
    return this.userTokenModel.remove(filter);
  }

  async verifyUserRefreshToken(token: string): Promise<UserTokenModel> {
    const { secret } = this.config.jwt.refresh;
    try {
      await this.jwtService.verifyAsync(token, { secret });
    } catch (err) {
      await this.userTokenModel.deleteOne({ token });
      throw err;
    }
    const userToken = await this.userTokenModel.findOne({ token });
    if (!userToken) {
      throw new NotFoundException({
        message: 'REFRESH_TOKEN_NOT_FOUND',
      });
    }
    return userToken;
  }
}
