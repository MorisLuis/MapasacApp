import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const FIRST_LETTER_INDEX = 0;
const REMAINING_LETTERS_INDEX = 1;

const capitalizeProperNouns = (str: string): string => {
    return str.replace(/\w\S*/g, (word) => {
        if (['de', 'a', 'las'].includes(word.toLowerCase())) {
            return word;
        }
        return word.charAt(FIRST_LETTER_INDEX).toUpperCase() + word.slice(REMAINING_LETTERS_INDEX);
    });
}


export const dateFormat = (date: string | undefined ) : string | void => {
    if(!date) return;

    const formattedDate = format(new Date(date), "EEEE, d 'de' MMMM 'de' y", { locale: es });
    const formattedDateWithCapitalization = formattedDate
        .split(' ')
        .map(capitalizeProperNouns)
        .join(' ');

    return formattedDateWithCapitalization;
}
