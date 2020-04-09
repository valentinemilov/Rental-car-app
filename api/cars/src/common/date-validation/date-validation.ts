import * as moment from 'moment';

const isPeriodValid = (start: Date, end: Date): boolean => {
    let isValid = true;
    const firstDate = moment(start);
    const secondDate = moment(end);
    if (firstDate >= secondDate) {
        isValid = false;
    }

    return isValid;
};

export default isPeriodValid;
