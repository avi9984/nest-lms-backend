import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCourseDto {

    @IsString()
    name: string;

    @IsString()
    description: string;

    @IsString()
    level: string;

    @IsNumber()
    @IsNotEmpty()
    price: number

}
