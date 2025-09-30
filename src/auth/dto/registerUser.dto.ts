import { IsEmail, IsNotEmpty, IsString, } from 'class-validator';

export class RegisterDto {
    @IsString()
    fname: string;

    @IsString()
    lname: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    password: string
}

export class LoginDto {

    @IsEmail()
    email: string;

    @IsString()
    password: string;

}