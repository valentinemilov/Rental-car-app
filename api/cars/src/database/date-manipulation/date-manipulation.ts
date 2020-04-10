import * as moment from 'moment';

const now = (): Date => new Date();

const addHoursFromNow = (date: Date, hours: number): string => moment(date)
    .add(hours, 'hours')
    .format();

const subtractHoursFromNow = (date: Date, hours: number): string => moment(date)
    .subtract(hours, 'hours')
    .format();

export {
    now,
    addHoursFromNow,
    subtractHoursFromNow,
};
