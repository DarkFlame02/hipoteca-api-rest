export function redondear(valor : number, decimales : number) {
    const factor = Math.pow(10, decimales);
    return Math.round(valor * factor) / factor;
}

export function numeroValido(valor : number) {
    return !isNaN(valor) && valor > 0;
}