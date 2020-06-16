import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCarDTO {

    @IsNotEmpty()
    brand: string;

    @IsNotEmpty()
    model: string;

    @IsString()
    @IsNotEmpty()
    class: string;

    @IsString()
    @IsNotEmpty()
    picture: string;
}