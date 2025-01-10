import { User } from '@/entities/user/@x/auth';

export interface AuthResponse {
  message: string;
  user: User;
  accessToken: string;
}
