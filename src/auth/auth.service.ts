import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  validateUser(data: LoginDto) {
      throw new Error('Method not implemented.');
  }
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  // Método login: valida credenciales y devuelve token
  async login(loginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }

    const payload = { id: user.id, email: user.email, role: user.role };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }
}
