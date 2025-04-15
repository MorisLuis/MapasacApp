const FRACTION_DIGITS = 2;

export const format = (value: number) : string => {
    // Crear formateador
    const formatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: FRACTION_DIGITS,
        maximumFractionDigits: FRACTION_DIGITS,
    });

    const formattedValue = formatter.format(value); // $2,500.00
    return `${formattedValue} MXN`;
};
