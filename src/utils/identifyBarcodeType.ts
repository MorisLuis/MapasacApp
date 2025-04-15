// Definir constantes para los valores mágicos
const LONGITUD_UPC = 12;
const LONGITUD_EAN = 13;
const START_INDEX = 1; // Definir el índice para substring

export const identifyUPCOrEANBarcode = (codebar?: string): string | null => {
    if (!codebar) return null; // Verificación rápida para cadenas undefined o null

    // Verificar la longitud del código
    if (codebar.length === LONGITUD_UPC) {
        return "UPC-A";
    } else if (codebar.length === LONGITUD_EAN) {
        if (codebar.startsWith("0") && codebar.substring(START_INDEX).match(/^\d{12}$/)) {
            return "UPC-A convertido a EAN-13";
        } else {
            return "EAN-13";
        }
    } else {
        return "Código de barras inválido";
    }
};

export const identifyBarcodeType = (barcode: string): string => {
    // Patrones comunes de longitud y caracteres para distintos tipos de códigos de barras
    const barcodePatterns: { [key: string]: RegExp } = {
        EAN_14: /^\d{14}$/,                // 14 dígitos numéricos
        EAN_13: /^\d{13}$/,                // 13 dígitos numéricos
        EAN_8: /^\d{8}$/,                  // 8 dígitos numéricos
        UPC_A: /^\d{12}$/,                 // 12 dígitos numéricos
        UPC_E: /^\d{8}$/,                  // 8 dígitos numéricos (UPC-E)
        CODE_128: /^[\x21-\x7E]+$/,        // Caracteres ASCII imprimibles (excluyendo caracteres de control)
        CODE_39: /^[A-Z0-9\-.$/+%]+$/,    // A-Z, 0-9 y algunos caracteres especiales
        ITF_14: /^\d{14}$/,                // 14 dígitos numéricos
        CODE_93: /^[\x21-\x7E]+$/,         // Similar a Code 128
        CODABAR: /^[A-D][0-9\-:$/.+\]+[A-D]$/ // Codabar: A-D, 0-9, y algunos caracteres especiales
    };

    for (const [type, pattern] of Object.entries(barcodePatterns)) {
        if (pattern.test(barcode)) {
            return type;
        }
    }

    return 'Desconocido';
};


