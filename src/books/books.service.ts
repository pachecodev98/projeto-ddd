import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookDto) {
    const book = await this.prisma.book.create({
      data: {
        title: dto.title,
        author: dto.author ?? null,
        category: dto.category ?? null,
        available: dto.available ?? true,
      },
    });
    return book;
  }

  async findAll() {
    return this.prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new NotFoundException('Livro não encontrado');
    return book;
  }

  async update(id: number, dto: UpdateBookDto) {
    await this.findOne(id);

    const updated = await this.prisma.book.update({
      where: { id },
      data: {
        ...(dto.title !== undefined && { title: dto.title }),
        ...(dto.author !== undefined && { author: dto.author }),
        ...(dto.category !== undefined && { category: dto.category }),
        ...(dto.available !== undefined && { available: dto.available }),
      },
    });

    return updated;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.book.delete({ where: { id } });
    return { message: 'Livro removido' };
  }
}
