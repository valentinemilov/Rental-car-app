import { Controller, Get, Param } from '@nestjs/common';

import { CarService } from './car.service';
import { CarDTO } from './models/car';

@Controller('car')

export class CarController {
    public constructor(
        private readonly carService: CarService,
    ) { }

    @Get()
    public async getAllFreeCars(): Promise<CarDTO[]> {
        return await this.carService.getAllFreeCars();
    }

    @Get(':id')
    public async getIndividualCar(
        @Param('id') carId: string,
    ): Promise<CarDTO> {
        return await this.carService.getIndividualCar(carId);
    }
}
