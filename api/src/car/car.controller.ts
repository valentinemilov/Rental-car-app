import { Controller, Get, Param } from '@nestjs/common';

import { CarService } from './car.service';
import { CarDTO } from './models/car';
import { CarsDTO } from './models/cars';

@Controller('car')

export class CarController {
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
}
