import {format, isDate, isFuture, isValid, parse} from 'date-fns';

export const isValidDate = (val: string) => {
    const date = parse(val, 'yyyyMMdd', new Date());
    return isDate(date) && isValid(date) && !isFuture(date);
};

export const toDateStr = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
};
