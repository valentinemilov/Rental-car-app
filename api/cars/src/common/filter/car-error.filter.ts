import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { CarError } from '../exceptions/car.error';

@Catch(CarError)
export class CarErrorFilter implements ExceptionFilter {
    public catch(exception: CarError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(exception.code).json({
            status: exception.code,
            error: exception.message,
        });
    }
}
