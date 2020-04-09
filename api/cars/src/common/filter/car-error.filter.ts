import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

import { ApplicationError } from '../exceptions/app.error';

@Catch(ApplicationError)
export class ApplicationErrorFilter implements ExceptionFilter {
    public catch(exception: ApplicationError, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        response.status(exception.code).json({
            status: exception.code,
            error: exception.message,
        });
    }
}
