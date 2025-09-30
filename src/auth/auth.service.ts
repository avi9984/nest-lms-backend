import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDto, RegisterDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async registerUser(registerUserDto: RegisterDto) {
        // Logic for user register
        /**
         * 1. Check if email already exists
         * 2. Hash the password
         * 3. Store the user into db
         * 4. Generate jwt token
         * 5. Send token in responce
         */
        const saltRounds = 10;
        const hash = await bcrypt.hash(registerUserDto.password, saltRounds);

        const user = await this.userService.createUser({ ...registerUserDto, password: hash })
        const payload = { sub: user._id }
        const token = await this.jwtService.signAsync(payload)
        // console.log(token);
        return { access_token: token };
    }

    // async loginUser(loginUserDto: LoginDto){
    //     const checkUser= await this.
    // }

}
