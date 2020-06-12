import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateCarDTO {

    @IsOptional()
    @IsNotEmpty()
    brand: string;

    @IsOptional()
    @IsNotEmpty()
    model: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    class: string;
}
