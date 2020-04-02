import { ApplicationError } from '../exceptions/app.error';

const should = (rule: boolean, message = "Invalid input"): void => {
    if (!rule) {
        throw new ApplicationError(message, 400);
    }
};

const exists = (object, message = "Invalid input"): void => {
    if (!object) {
        throw new ApplicationError(message, 404);
    }
};

export default {
    should,
    exists,
};
