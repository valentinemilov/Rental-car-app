import { ApplicationError } from '../exceptions/app.error';

const should = (rule: boolean, message = "Invalid input") => {
    if (!rule) {
        throw new ApplicationError(message, 400);
    }
}

const exists = (object: Object, message = "Invalid input") => {
    if (!object) {
        throw new ApplicationError(message, 404);
    }
}

export default {
    should,
    exists,
}
