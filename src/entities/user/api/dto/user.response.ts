import { User } from '../../model/user.types';

export interface UpdateProfileResponse {
  user: User;
  message: string;
}
