
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

    this.authService.setAuthCookiesConfigurations(response, access_token);

    return { message: "Login Sucessfully" }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() user: UserDto, @Res({ passthrough: true }) response: Response) {
    const { access_token } = await this.authService.signUp(user);

    this.authService.setAuthCookiesConfigurations(response, access_token);

    return { message: "Signed up sucessfully" }
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) response: Response) {
    this.authService.setAuthCookiesConfigurations(response);

    return { message: 'Logged out sucessfully' }
  }


  @Get('validate')
  @UseGuards(AuthGuard)
  validateUser() {
    return {isAuthenticated: true}
  }
}
