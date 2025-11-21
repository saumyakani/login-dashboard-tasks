
import { format, formatDistanceToNow } from 'date-fns';

export const formatDateTime = (dateString) => {
    if (!dateString) return 'N/A';
    try {
        return format(new Date(dateString), 'MM/dd/yyyy, h:mm:ss a');
    } catch (e) {
        return 'Invalid Date';
    }
};
export const formatTimeDifference = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      
        return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (e) {
        return 'Invalid Date';
    }
};