
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto, @Res({ passthrough: true }) response: Response) {
    const { access_token } = await this.authService.login(userLoginDto.email, userLoginDto.password);

    response.cookie('auth_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Change this in the future?
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day - Change this in the future?
    });

    return { message: "Login Sucessfully" }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() user: UserDto, @Res({ passthrough: true }) response: Response) {
    const { access_token } = await this.authService.signUp(user);

    response.cookie('auth_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // Change this in the future?
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day - Change this in the future?
    });

    // return { message: "Signed up sucessfully", token: access_token }
    return { message: "Signed up sucessfully" }
  }
}
