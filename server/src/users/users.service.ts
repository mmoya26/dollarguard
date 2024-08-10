
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './schemas/users.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  async createUser(user: UserDto) {
    const exisitingUser = await this.userModel.findOne({email: user.email});

    if (exisitingUser) { throw new HttpException('Unable to create the user account', HttpStatus.BAD_REQUEST)}

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = await this.userModel.create({
      firstName: user.firstName,
      lastName: user.lastName,
      creationDate: new Date(),
      email: user.email,
      password: hashedPassword
    });

    return newUser.save();
  }

  async findUserById(id: string) {
    return this.userModel.findById(id);
  }

  async findUserByEmail(email: string) {
    return await this.userModel.findOne({email});
  }
}
