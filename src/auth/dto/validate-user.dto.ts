import { IsNotEmpty, IsString } from 'class-validator';

export interface ValidateUserDTO {
  username: string;
  password: string;
}
