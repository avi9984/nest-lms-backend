import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    @Post('register')
    // Register logic here but in nest write bussiness logic in service
    async register(@Body() registerUserDto: RegisterDto) {
        const token = await this.authService.registerUser(registerUserDto)
        return token
    }


    @Post('login')
    async loginUser(@Body() loginUserDto: LoginDto) {
        // const token=await this.authService.loginUser(loginUserDto)
    }

}
