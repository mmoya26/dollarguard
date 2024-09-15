
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async createUser(user: UserDto) {
    const existingUser = await this.userModel.findOne({lowerCaseEmail: user.email.toLowerCase()});

    if (existingUser) { throw new HttpException('Unable to create the user account', HttpStatus.BAD_REQUEST)}

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.userModel.create({
      name: user.name,
      creationDate: new Date(),
      email: user.email,
      lowerCaseEmail: user.email.toLowerCase(),
      password: hashedPassword
    });

    console.log(newUser);

    return await newUser.save()
  }

  async findUserById(id: string) {
    return this.userModel.findById(id);
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({email});
  }
}
