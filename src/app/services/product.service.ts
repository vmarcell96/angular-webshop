import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map } from "rxjs";
import { Product } from "../types/product";

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    // api folder added in angular.json file in the assets array
    // it can be used as a mock api
    private productUrl = 'api/products/products.json';

    constructor(private http: HttpClient) {

    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productUrl).pipe(
            //with tap we can access the emitted item without modifying it
            tap(data => console.log("sd")),
            catchError(this.handleError)
        );
    }

    // Get one product
    // Since we are working with a json file, we can only retrieve all products
    // So retrieve all products and then find the one we want using 'map'
    getProduct(id: number): Observable<Product | undefined> {
        return this.getProducts()
            .pipe(
                map((products: Product[]) => products.find(p => p.productId === id))
            );
    }



    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(() => errorMessage);
    }
}