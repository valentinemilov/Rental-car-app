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
        const debtRequests: CarDTO[] = await this.carService.getAllFreeCars();

        return debtRequests;
    }

    @Get('/:id')
    public async getIndividualCar(
        @Param('id') carId: string,
    ): Promise<CarDTO> {
        const foundCar: CarDTO = await this.carService.getIndividualCar(carId);

        return foundCar;
    }


}
