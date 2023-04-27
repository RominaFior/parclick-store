import { Product } from 'src/app/public';
import { PriceRange } from '../models';

export const createPriceRanges =  (products: Product[]): PriceRange[]=>{
  // Obtener el precio más alto del array de productos
  const maxPrice = Math.max(...products.map((product) => product.price));

  // Calcular el tamaño de los rangos de precios
  const rangeSize = maxPrice / 5;

  // Crear los 5 rangos de precios
  const priceRanges = [];
  for (let i = 0; i < 5; i++) {
    const price_min = Math.round((i * rangeSize) / 5) * 5;
    const price_max = Math.round(((i + 1) * rangeSize) / 5) * 5;
    const price_id = i + 1;
    priceRanges.push({ price_min, price_max, price_id });
  }

  return priceRanges;
}
