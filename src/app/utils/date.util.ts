import {format, isDate, isFuture, isValid, parse} from 'date-fns';

export const isValidDate = (val: string) => {
    const date = parse(val, 'yyyy-MM-dd', new Date());
    return isDate(date) && isValid(date) && !isFuture(date);
};

export const toDate = (date: Date) => {
    console.log(format(date, 'yyyy-MM-dd'), date);
    
    return format(date, 'yyyy-MM-dd');
};
