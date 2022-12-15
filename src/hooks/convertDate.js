export function convertDate(value) {
    const valueConvert = new Intl.DateTimeFormat('pt-BR').format(value)
    // new Intl.DateTimeFormat('pt-BR').format(date)
    return valueConvert
}