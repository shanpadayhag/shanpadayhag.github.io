import * as datefns from 'date-fns';

const dateUtil = {
    toDateSortableFormat(date: Date) {
        return datefns.format(date, 'yyyy-MM-dd');
    },

    toBlogPostItemDatetimeFormat(date: Date) {
        return datefns.format(date, 'MMM dd, yyyy');
    }
};

export default dateUtil;
