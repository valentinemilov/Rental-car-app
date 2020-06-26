import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateCarDTO {

    @IsNotEmpty()
    brand: string;

    @IsNotEmpty()
    model: string;

    @IsString()
    @IsNotEmpty()
    class: string;
}