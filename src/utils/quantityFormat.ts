

export const quantityFormat = (quantity: number | string): string => {
    // Convertir la entrada a número
    const num = typeof quantity === 'string' ? parseFloat(quantity) : quantity;

    // Manejar el caso cuando la conversión falla (NaN)
    if (isNaN(num)) {
        return "0.00"; // o cualquier valor predeterminado apropiado
    }

    // Formatear el número a un máximo de 2 decimales
    const formattedQuantity = num.toFixed(2);

    // Retornar el número formateado
    return formattedQuantity;
};
