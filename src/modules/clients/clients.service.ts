import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClientsService {
  constructor(private prisma: PrismaService) {}

  async create(createClientDto: CreateClientDto) {
    try {
      const client = await this.prisma.client.create({ data: createClientDto });

      return client;
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(userId: string) {
    try {
      const clients = await this.prisma.client.findMany({
        where: { userId },
      });

      return clients;
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string, userId: string) {
    try {
      const client = await this.prisma.client.findUniqueOrThrow({
        where: { userId, id },
      });

      return client;
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto, userId: string) {
    try {
      const clientUpdated = await this.prisma.client.update({
        where: { userId, id },
        data: updateClientDto,
      });

      return clientUpdated;
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string, userId: string) {
    try {
      await this.prisma.client.delete({ where: { userId, id } });
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }
}
