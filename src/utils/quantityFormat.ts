export const quantityFormat = (quantity: number | string): string => {
    const DECIMALES = 2; // Número de decimales a mostrar

    // Convertir la entrada a número
    const num = typeof quantity === 'string' ? parseFloat(quantity) : quantity;

    // Manejar el caso cuando la conversión falla (NaN)
    if (isNaN(num)) {
        return '0.00'; // o cualquier valor predeterminado apropiado
    }

    // Formatear el número a un máximo de DECIMALES decimales
    const formattedQuantity = num.toFixed(DECIMALES);

    // Retornar el número formateado
    return formattedQuantity;
};
