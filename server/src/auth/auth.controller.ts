
import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards
  } from '@nestjs/common';
  import { AuthGuard } from './auth.guard';
  import { AuthService } from './auth.service';
import { UserDto } from 'src/users/dto/user.dto';
import { UserLoginDto } from './dto/user-login.dto';
  
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() userLoginDto: UserLoginDto) {
      return this.authService.signIn(userLoginDto.email, userLoginDto.password);
    }
  
    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }

    @HttpCode(HttpStatus.CREATED)
    @Post('register')
    signUp(@Body() user: UserDto) {
      return this.authService.register(user);
    }
  }
  