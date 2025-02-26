
export const identifyUPCOrEANBarcode = (codebar?: string) => {
    if (!codebar) return null; // Verificación rápida para cadenas undefined o null
    // Verificar la longitud del código
    if (codebar.length === 12) {
        return "UPC-A";
    } else if (codebar.length === 13) {
        if (codebar.startsWith("0") && codebar.substring(1).match(/^\d{12}$/)) {
            return "UPC-A convertido a EAN-13";
        } else {
            return "EAN-13";
        }
    } else {
        return "Código de barras inválido";
    }
};

export const identifyBarcodeType = (barcode: string) => {
    // Patrones comunes de longitud y caracteres para distintos tipos de códigos de barras
    const barcodePatterns: { [key: string]: RegExp } = {
        EAN_14: /^\d{14}$/,                // 13 dígitos numéricos
        EAN_13: /^\d{13}$/,                // 13 dígitos numéricos
        EAN_8: /^\d{8}$/,                  // 8 dígitos numéricos
        UPC_A: /^\d{12}$/,                 // 12 dígitos numéricos
        UPC_E: /^\d{8}$/,                  // 8 dígitos numéricos (UPC-E)
        CODE_128: /^[\x00-\x7F]+$/,        // Caracteres ASCII de 0 a 127
        CODE_39: /^[A-Z0-9\-\. \$\/\+\%]+$/, // A-Z, 0-9 y algunos caracteres especiales
        ITF_14: /^\d{14}$/,                // 14 dígitos numéricos
        CODE_93: /^[\x00-\x7F]+$/,         // Similar a Code 128
        CODABAR: /^[A-D][0-9\-\$:\/\.\+\]+[A-D]$/ // Codabar: A-D, 0-9, y algunos caracteres especiales
    };

    for (const [type, pattern] of Object.entries(barcodePatterns)) {
        if (pattern.test(barcode)) {
            return type;
        }
    }

    return 'Desconocido';
}