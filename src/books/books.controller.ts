import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    UseGuards,
    ParseIntPipe,
  } from '@nestjs/common';
  import { BooksService } from './books.service';
  import { CreateBookDto } from './dto/create-book.dto';
  import { UpdateBookDto } from './dto/update-book.dto';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { RolesGuard } from '../auth/guards/roles.guard';
  import { Roles } from '../auth/decorators/roles.decorator';
  import { UserRole } from '../common/enums/user-role.enum';
  
  @Controller('books')
  export class BooksController {
    constructor(private readonly booksService: BooksService) {}
    // cria um novo livro
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    @Post()
    create(@Body() dto: CreateBookDto) {
      return this.booksService.create(dto);
    }
    // retorna todos os livros 
    @UseGuards(JwtAuthGuard)
    @Get()
    findAll() {
      return this.booksService.findAll();
    }
    // retorna um livro por id
    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.booksService.findOne(id);
    }
    // atualiza um livro por id
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN, UserRole.TEACHER)
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateBookDto) {
      return this.booksService.update(id, dto);
    }
    // deleta um livro por id
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.booksService.remove(id);
    }
  }
  