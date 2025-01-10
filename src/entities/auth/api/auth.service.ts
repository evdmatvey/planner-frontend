import { AccessTokenStorage, requester } from '@/shared/lib/requester';
import { AuthResponse } from './dto/auth.response';
import { LoginDto } from './dto/login.dto';
import { LogoutResponse } from './dto/logout.response';
import { RegisterDto } from './dto/register.dto';

class AuthService {
  private readonly _baseUrl = '/auth';

  public async login(dto: LoginDto) {
    const response = await requester.post<AuthResponse>(
      `${this._baseUrl}/login`,
      dto,
    );

    if (response.status === 200)
      AccessTokenStorage.saveToken(response.data.accessToken);

    return response.data;
  }

  public async register(dto: RegisterDto) {
    const response = await requester.post<AuthResponse>(
      `${this._baseUrl}/register`,
      dto,
    );

    if (response.status === 201)
      AccessTokenStorage.saveToken(response.data.accessToken);

    return response.data;
  }

  public async logout() {
    const response = await requester.post<LogoutResponse>(
      `${this._baseUrl}/logout`,
    );

    AccessTokenStorage.removeToken();

    return response.data;
  }
}

export const authService = new AuthService();
