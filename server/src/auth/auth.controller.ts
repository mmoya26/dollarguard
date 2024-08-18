
import {Body, Controller, Get, HttpCode, HttpStatus, Post, Res, UseGuards} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto, @Res({ passthrough: true }) response: Response) {
    const { access_token } = await this.authService.login(userLoginDto.email, userLoginDto.password);

    response.cookie('auth_token', access_token, {
      httpOnly: true,
      secure: true, 
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000 
    });

    return { message: "Login Sucessfully" }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() user: UserDto, @Res({ passthrough: true }) response: Response) {
    const { access_token } = await this.authService.signUp(user);

    response.cookie('auth_token', access_token, {
      httpOnly: true,
      secure: true, 
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000
    });

    return { message: "Signed up sucessfully" }
  }

  @Get('validate')
  @UseGuards(AuthGuard)
  validateUser() {
    return {isAuthenticated: true}
  }
}
