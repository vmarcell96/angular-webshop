import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Product } from '../types/product';

@Injectable({
  providedIn: 'root'
})


export class ProductData implements InMemoryDbService {

  constructor() {}

  createDb(): { products: Product[]} {
    const products: Product[] = [
        {
          "id": 1,
          "productName": "Apple",
          "productCode": "AF-0233",
          "releaseDate": "750,000 BC",
          "description": "An apple is an edible fruit produced by an apple tree.",
          "price": 2.50,
          "starRating": 4.4,
          "imageUrl": "assets/images/apple.png",
          "tags": ["fruit", "tasty"]
        },
        {
          "id": 2,
          "productName": "Banana",
          "productCode": "BF-0122",
          "releaseDate": "327 BC",
          "description": "A banana is an elongated, edible fruit produced by several kinds of large herbaceous flowering plants in the genus Musa.",
          "price": 3.05,
          "starRating": 4.2,
          "imageUrl": "assets/images/banana.png",
          "tags": ["fruit", "tasty"]
        },
        {
          "id": 5,
          "productName": "Blue Berry",
          "productCode": "BF-0775",
          "releaseDate": "11000 BC",
          "description": "Blueberries are a widely distributed and widespread group of perennial flowering plants with blue or purple berries.",
          "price": 6.30,
          "starRating": 4.1,
          "imageUrl": "assets/images/blueberry.png",
          "tags": ["fruit", "tasty"]
        },
        {
          "id": 8,
          "productName": "Lemon",
          "productCode": "LF-0002",
          "releaseDate": "700 AD",
          "description": "The lemon (Citrus limon) is a species of small evergreen trees in the flowering plant family Rutaceae, native to Asia, primarily Northeast India (Assam), Northern Myanmar or China.",
          "price": 3.50,
          "starRating": 3.3,
          "imageUrl": "assets/images/lemon.png",
          "tags": ["fruit", "tasty"]
        },
        {
          "id": 10,
          "productName": "Orange",
          "productCode": "OF-0423",
          "releaseDate": "314 BC",
          "description": "An orange is a fruit of various citrus species in the family Rutaceae.",
          "price": 3.20,
          "starRating": 3.9,
          "imageUrl": "assets/images/orange.png",
          "tags": ["fruit", "tasty"]
        },
        {
          "id": 14,
          "productName": "Pineapple",
          "productCode": "PF-0403",
          "releaseDate": "1200 BC",
          "description": "The pineapple is indigenous to South America, where it has been cultivated for many centuries. The introduction of the pineapple to Europe in the 17th century made it a significant cultural icon of luxury. ",
          "price": 6.20,
          "starRating": 4.4,
          "imageUrl": "assets/images/pineapple.png",
          "tags": ["fruit", "tasty"]
        }
      ];
    return { products };
  }
}
