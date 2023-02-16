export type Product = {
    "id": number | null;
    "productName": string;
    "productCode": string;
    "releaseDate": string;
    "price": number;
    "description": string;
    "starRating": number;
    "imageUrl": string;
    "tags"?: string[];
};