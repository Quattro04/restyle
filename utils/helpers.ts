
const currencyMap: Record<string,string> = {
    'eur': '€'
}

export const formatPrice = (currency: string, value: number) => {
    return `${currencyMap[currency]}${value.toFixed(2)}`
}
