export const format = (value: number) => {
    // Crear formateador
    const formatter = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    const formattedValue = formatter.format(value); // $2,500.00
    return `${formattedValue} MXN`;
};
