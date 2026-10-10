import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RoomsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRoomDto: CreateRoomDto) {
    return this.prisma.room.create({ data: createRoomDto });
  }

  findAll() {
    return this.prisma.room.findMany({ include: { configs: true } });
  }

  async findOne(id: number) {
    const room = await this.prisma.room.findUnique({ where: { id } });

    if (!room) throw new NotFoundException(`Room with id ${id} not found`);

    return room;
  }

  remove(id: number) {
    return this.prisma.room.delete({ where: { id } });
  }
}
