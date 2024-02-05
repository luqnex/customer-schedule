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

  async findAll() {
    try {
      // TODO: get id from token before get all clients
      const MOCK_USER_ID = '9e2aee67-898b-44d6-8bf0-b1ff1ec08d65';

      const clients = await this.prisma.client.findMany({
        where: { userId: MOCK_USER_ID },
      });

      return clients;
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      // TODO: get id from token before get all clients
      const MOCK_USER_ID = '9e2aee67-898b-44d6-8bf0-b1ff1ec08d65';

      const client = await this.prisma.client.findUniqueOrThrow({
        where: { userId: MOCK_USER_ID, id },
      });

      return client;
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    try {
      // TODO: get id from token before get all clients
      const MOCK_USER_ID = '9e2aee67-898b-44d6-8bf0-b1ff1ec08d65';

      const clientUpdated = await this.prisma.client.update({
        where: { userId: MOCK_USER_ID, id },
        data: updateClientDto,
      });

      return clientUpdated;
    } catch (error) {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string) {
    try {
      // TODO: get id from token and usage to delete with client id
      const MOCK_USER_ID = '9e2aee67-898b-44d6-8bf0-b1ff1ec08d65';

      await this.prisma.client.delete({ where: { userId: MOCK_USER_ID, id } });
    } catch (error) {}
  }
}
