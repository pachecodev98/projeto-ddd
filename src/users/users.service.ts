import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-use.dto';
import { UserRole } from '../common/enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // usado pelo controller (retorna sem senha)
  async create(dto: CreateUserDto) {
    const exists = await this.prisma.user.findUnique({ where: { email: dto.email }});
    if (exists) throw new BadRequestException('E-mail já cadastrado');

    const hashed = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashed,
        role: dto.role as UserRole ?? UserRole.STUDENT,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      }
    });
    return user;
  }

  // retorna TODOS sem senha
  async findAll() {
    return this.prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true, status: true, createdAt: true, updatedAt: true }
    });
  }

  // retorna um usuário público (sem senha)
  async findByIdPublic(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, role: true, status: true, createdAt: true, updatedAt: true }
    });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    return user;
  }

  // retorna FULL (inclui senha)
  async findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email }});
  }

  async update(id: number, dto: UpdateUserDto) {
    const userExists = await this.prisma.user.findUnique({ where: { id }});
    if (!userExists) throw new NotFoundException('Usuário não encontrado');

    const data: any = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    const updated = await this.prisma.user.update({
      where: { id },
      data,
      select: { id: true, name: true, email: true, role: true, status: true, createdAt: true, updatedAt: true }
    });
    return updated;
  }

  async remove(id: number) {
    const userExists = await this.prisma.user.findUnique({ where: { id }});
    if (!userExists) throw new NotFoundException('Usuário não encontrado');
    await this.prisma.user.delete({ where: { id }});
    return { message: 'Usuário removido' };
  }
}
