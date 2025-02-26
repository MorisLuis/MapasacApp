import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const capitalizeProperNouns = (str: string) => {
    return str.replace(/\w\S*/g, (word) => {
        if (['de', 'a', 'las'].includes(word.toLowerCase())) {
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
}

export const dateFormat = (date: string | undefined ) => {
    if(!date) return;

    const formattedDate = format(new Date(date), "EEEE, d 'de' MMMM 'de' y", { locale: es });

    const formattedDateWithCapitalization = formattedDate
        .split(' ')
        .map(capitalizeProperNouns)
        .join(' ');

    return formattedDateWithCapitalization;
}
