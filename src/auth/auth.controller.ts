import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: LoginDto) {
    // Llamamos al método correcto del AuthService
    const userToken = await this.authService.validateUser(data);

    // Si por alguna razón no se genera token, lanzamos excepción
    if (userToken == null) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }

    // Retornamos el token
    return userToken;
  }
}
