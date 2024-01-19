import { Document } from 'mongoose';
import { Permission } from 'src/auth/enums/permission.enum';
import { Role } from 'src/auth/enums/role.enum';

export interface UserDocument extends Document {
  email: string;
  password: string;
  username: string;
  timezone: string;
  firstName: string;
  lastName: string;
  socialId: string;
  provider: string;
  role: Role;
  permissions: { [key in Permission]?: boolean } | null;
}
