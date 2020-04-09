import { ApplicationError } from '../exceptions/app.error';

const should = (rule: boolean, message = "Invalid input"): void => {
    if (!rule) {
        throw new ApplicationError(message, 400);
    }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const exists = (object: any, message = "Invalid input"): void => {
    if (!object) {
        throw new ApplicationError(message, 404);
    }
};

export default {
    should,
    exists,
};
