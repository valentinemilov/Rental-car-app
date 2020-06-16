import { ApplicationError } from '../exceptions/app.error';

const msg = 'No null values should be provided';

const validateCarBody = (car): void => {
    Object.values(car)
        .some((x: string) => {
            if (!x || x.trim() === "") {
                throw new ApplicationError(msg, 404);
            }
        });
};

export default validateCarBody;
