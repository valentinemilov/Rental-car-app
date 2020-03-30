import * as moment from 'moment';

const isDateValid = (a: Date, b: Date) => {
    let isValid = true;
    const firstDate = moment(a);
    const secondDate = moment(b);
    if (firstDate <= secondDate) {
        isValid = false;
    }

    return isValid;
};

export default isDateValid;
