import { requester } from './requester';

interface AccessTokenResponse {
  accessToken: string;
}

class TokenService {
  public async getNewTokens() {
    const response = requester.post<AccessTokenResponse>(
      '/auth/login/access-token',
    );

    return response;
  }
}

export const tokenService = new TokenService();
