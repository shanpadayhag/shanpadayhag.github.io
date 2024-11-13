import * as datefns from 'date-fns';

const dateUtil = {
    toDateSortableFormat(date: Date) {
        return datefns.format(date, 'yyyy-MM-dd');
    },

    toBlogPostItemDatetimeFormat(date: Date, options?: {
        includeDay?: boolean;
        completeMonth?: boolean;
    }) {
        let format = '';

        if (options?.includeDay)
            format += 'EEEE, ';
        if (options?.completeMonth)
            format += 'MMMM ';
        else
            format += 'MMM ';
        format += 'dd, yyyy';

        return datefns.format(date, format);
    }
};

export default dateUtil;
