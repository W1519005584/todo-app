export interface UserInfo {
  id: number;
  username: string;
  nickname?: string | null;
  createdAt: string;
}

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  nickname?: string;
}

export interface AuthResult {
  token: string;
  user: UserInfo;
}
