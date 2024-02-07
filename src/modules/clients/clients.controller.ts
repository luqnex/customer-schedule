import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { AuthGuard } from '../auth/auth.guard';
import { IRequestExtended } from '../interfaces/request';
@UseGuards(AuthGuard)
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.create(createClientDto);
  }

  @Get()
  findAll(@Req() request: IRequestExtended) {
    const userId = request.user.sub;

    return this.clientsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: IRequestExtended) {
    const userId = request.user.sub;

    return this.clientsService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Req() request: IRequestExtended,
  ) {
    const userId = request.user.sub;

    return this.clientsService.update(id, updateClientDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() request: IRequestExtended) {
    const userId = request.user.sub;

    return this.clientsService.remove(id, userId);
  }
}
