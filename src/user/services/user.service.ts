import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PERMISSION_BY_ROLE } from 'src/auth/constants/permission.constants';
import { USER } from '../constants';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserInput } from '../dto/update-user.input';
import { User, UserDocument, UserModel } from '../repositories/interfaces';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(USER)
    private readonly userModel: Model<UserDocument>,
  ) {}

  create(createUserInput: Partial<CreateUserInput>) {
    return this.userModel.create(createUserInput);
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(params: Partial<User>) {
    return this.userModel.findOne(params).exec();
  }

  findOneById(id: string) {
    return this.userModel.findOne({ _id: id }).exec();
  }

  findOneByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.userModel.findOneAndUpdate(
      { _id: id },
      { ...updateUserInput.user },
      { returnOriginal: false },
    );
  }

  remove(id: string) {
    return this.userModel.remove({ _id: id });
  }

  async findRoleAndPermissions(gainIdOrUser: number | UserModel) {
    const user =
      typeof gainIdOrUser === 'number'
        ? await this.userModel.findOne({
            where: { gainId: gainIdOrUser },
            select: ['gainId', 'role', 'permissions'],
          })
        : gainIdOrUser;

    if (!user)
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          errors: {
            message: 'You are not authorized to access this resource',
          },
        },
        HttpStatus.UNAUTHORIZED,
      );

    const { role, permissions } = user;
    return {
      rolePermissions: PERMISSION_BY_ROLE[role] || [],
      userPermissions: permissions || {},
    };
  }
}
