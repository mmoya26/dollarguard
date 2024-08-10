
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async signIn(username: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findUserByEmail(username);

    // Bcrypt compare here
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }

    const payload = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }


  async register(user: UserDto) {
    return this.userService.createUser(user);
  }
}