import {
    IsString,
    IsNotEmpty,
    IsInt,
    Min,
    MinLength,
    IsDateString,
} from 'class-validator';

export class CreateContractDTO {

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    firstName: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    lastName: string;

    @IsInt()
    @IsNotEmpty()
    @Min(18)
    age: number;

    @IsNotEmpty()
    @IsDateString()
    estimatedReturnDate: Date;
}
