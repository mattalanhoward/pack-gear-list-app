// grams <-> ounces
export const gramsToOunces = (g) => (g / 28.3495).toFixed(2);
export const ouncesToGrams = (oz) => Math.round(oz * 28.3495);