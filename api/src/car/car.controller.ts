import {
    Controller,
    Get,
    Param,
    Put,
    Post,
    UploadedFile,
    UseInterceptors,
    Body,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CarService } from './car.service';
import { CarDTO } from './models/car';
import { CarsDTO } from './models/cars';
import multerObject from '../common/utils/file-upload-utils';
import guard from '../common/guards/guard';
import { UpdateCarDTO } from './models/update-car';

@Controller('car')

export class CarController {
    static readonly FileNoFileProvidedMsg = "No file is provided";
    public constructor(
        private readonly carService: CarService,
    ) { }

    @Get()
    public async getAllCars(): Promise<CarsDTO[]> {
        return await this.carService.getAllCars();
    }

    @Get('available')
    public async getAllFreeCars(): Promise<CarDTO[]> {
        return await this.carService.getAllFreeCars();
    }

    @Get(':id')
    public async getIndividualCar(
        @Param('id') carId: string,
    ): Promise<CarDTO> {
        return await this.carService.getIndividualCar(carId);
    }

    @Get('available/:id')
    public async getIndividualFreeCar(
        @Param('id') carId: string,
    ): Promise<CarDTO> {
        return await this.carService.getIndividualFreeCar(carId);
    }

    @Put(':id')
    @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
    public async updateCar(
        @Body() car: UpdateCarDTO,
        @Param('id') carId: string,
    ): Promise<CarsDTO> {
        return await this.carService.updateCar(carId, car);
    }

    @Put(':id/image')
    @UseInterceptors(FileInterceptor('image', multerObject))
    public async uploadCarImage(
        @Param('id') carId: string,
        @UploadedFile() file: any,
    ): Promise<CarsDTO> {
        guard.exists(file, CarController.FileNoFileProvidedMsg);

        return await this.carService.uploadCarImage(carId, file.filename);
    }
}
