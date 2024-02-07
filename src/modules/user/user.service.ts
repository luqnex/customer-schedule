import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { hash } from 'bcrypt';

import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const hasUserEmailSaved =
        await this.validateUserAlreadyExists(createUserDto);

      if (hasUserEmailSaved) {
        throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
      }

      const salt = 10;
      const passwordHash = await hash(createUserDto.password, salt);
      const userData: CreateUserDto = {
        ...createUserDto,
        password: passwordHash,
      };

      const user = await this.prisma.user.create({
        data: userData,
        select: { id: true, email: true, name: true },
      });
      return user;
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const users = await this.prisma.user.findMany({
        select: { id: true, email: true, name: true },
      });
      return users;
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(email: string) {
    try {
      const user = await this.prisma.user.findFirstOrThrow({
        where: { email },
      });

      return user;
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async validateUserAlreadyExists(user: CreateUserDto): Promise<boolean> {
    const userData = await this.prisma.user.findFirst({
      where: { email: user.email },
      select: { email: true },
    });

    return userData ? true : false;
  }
}
