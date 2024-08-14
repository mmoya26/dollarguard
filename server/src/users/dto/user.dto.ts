import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserDto { 
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}