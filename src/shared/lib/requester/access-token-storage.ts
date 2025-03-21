import Cookies from 'js-cookie';
import { Tokens } from './token.types';

export class AccessTokenStorage {
  public static getToken(): string | null {
    const token = Cookies.get(Tokens.ACCESS_TOKEN);
    return token || null;
  }

  public static saveToken(token: string) {
    Cookies.set(Tokens.ACCESS_TOKEN, token, {
      domain: import.meta.env.VITE_DOMAIN,
      sameSite: 'strict',
      expires: +import.meta.env.VITE_ACCESS_TOKEN_EXPIRES,
    });
  }

  public static removeToken() {
    Cookies.remove(Tokens.ACCESS_TOKEN, {
      domain: import.meta.env.VITE_DOMAIN,
      sameSite: 'strict',
      expires: +import.meta.env.VITE_ACCESS_TOKEN_EXPIRES,
    });
  }
}
