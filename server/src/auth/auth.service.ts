
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async login(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) throw new UnauthorizedException();

    const isPasswordAMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordAMatch) throw new UnauthorizedException();

    const payload = { id: user.id, email: user.email, name: user.name};

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(user: UserDto) {
    return this.userService.createUser(user);
  }
}