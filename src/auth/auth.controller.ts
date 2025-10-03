import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/registerUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

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


    @UseGuards(AuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {

        const userId = req.user.sub;

        const user = await this.userService.getUserById(userId)

        console.log(user);
        return {
            id: user?._id,
            fname: user?.fname,
            lname: user?.lname,
            email: user?.email,
            role: user?.role
        }

    }

}
