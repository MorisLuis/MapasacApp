
export const capitalizarTexto = (texto: string) => {
    const palabras = texto?.split(" ");
    const palabrasCapitalizadas = palabras?.map((palabra) => {
        return palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase();
    });
    return palabrasCapitalizadas?.join(" ");
};