import { requesterWithAuth } from '@/shared/lib/requester';
import { User } from '../model/user.types';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateProfileResponse } from './dto/user.response';

class UserService {
  private readonly _baseUrl = '/user/profile';

  public async getProfile() {
    const response = await requesterWithAuth.get<User>(this._baseUrl);

    return response.data;
  }

  public async updateProfile(dto: UpdateProfileDto) {
    const response = await requesterWithAuth.put<UpdateProfileResponse>(
      this._baseUrl,
      dto,
    );

    return response.data;
  }
}

export const userService = new UserService();
