import { LoginDto } from './login.dto';

export interface RegisterDto extends LoginDto {
  passwordRepeat: string;
}
