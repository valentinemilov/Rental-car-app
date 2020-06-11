import {
    Controller,
    Get,
    Param,
    Put,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CarService } from './car.service';
import { CarDTO } from './models/car';
import { CarsDTO } from './models/cars';
import multerObject from '../common/utils/file-upload-utils';
import guard from '../common/guards/guard';

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

    // A route that gets a single image!!!
    // @Get('/image/:img')
    // public async getCarImage(
    //     @Param('img') image,
    //     @Res() res,
    // ): Promise<string> {
    //     return res.sendFile(image, { root: './pictures' });
    // }

    @Put('/:id/image')
    @UseInterceptors(FileInterceptor('image', multerObject))
    public async uploadCarImage(
        @Param('id') carId: string,
        @UploadedFile() file: any,
    ): Promise<any> {
        guard.exists(file, CarController.FileNoFileProvidedMsg);
        return await this.carService.uploadCarImage(carId, file.filename);
        // console.log(a);
        // const response = {
        //     originalname: file.originalname,
        //     filename: file.filename,
        // };
        // console.log(response);
        // return response;
    }
}
