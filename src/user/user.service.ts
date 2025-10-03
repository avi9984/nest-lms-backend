import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto, RegisterDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';


@Injectable()
export class UserService {

    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(registerUserDto: RegisterDto) {

        try {
            return await this.userModel.create({
                fname: registerUserDto.fname,
                lname: registerUserDto.lname,
                email: registerUserDto.email.toLowerCase(),
                password: registerUserDto.password
            })
        } catch (error: unknown) {
            // console.log(error)

            const e = error as { code?: 11000 }
            if (e.code === 11000) {
                throw new ConflictException(`${registerUserDto.email} is already taken`)
            }
            throw error
        }
    }

    async loginUser(loginUserDto: LoginDto) {

        const checkUser = await this.userModel.findOne({ email: loginUserDto.email.toLowerCase() })
        if (!checkUser) {
            throw new NotFoundException('User not found')
        }
        // const checkPassowrd= await this.JwtService
    }

    async getUserById(id: string) {
        return await this.userModel.findOne({ _id: id })
    }
}
