import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, tap, throwError, map, of } from "rxjs";
import { Product } from "../types/product";

@Injectable({
    providedIn: 'root'
})

export class ProductService {

    // api folder added in angular.json file in the assets array
    // it can be used as a mock api
    private productsUrl = 'api/products';

    constructor(private http: HttpClient) {

    }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.productsUrl).pipe(
            //with tap we can access the emitted item without modifying it
            tap(product => console.log(product)),
            catchError(this.handleError)
        );
    }

    // Get one product
    getProduct(id: number): Observable<Product> {
        // if id is 0 the user wants to add a new product, so we have to initialize one to return
        // maybe its defined on the back end server so this block is not necessary
        if (id === 0) {
            //of() converts an object into an observable
            return of(this.initializeProduct());
        }
        const url = `${this.productsUrl}/${id}`;
        return this.http.get<Product>(url)
            .pipe(
                //for debugging
                tap(data => console.log('getProduct: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    updateProduct(product: Product): Observable<Product> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productsUrl}/${product.id}`;
        return this.http.put<Product>(url, product, { headers })
            .pipe(
                tap(() => console.log('updateProduct: ' + product.id)),
                // Return the product on an update
                // we dont get a returned product automatically
                map(() => product),
                catchError(this.handleError)
            );
    }

    createProduct(product: Product): Observable<Product> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        product.id = null;
        return this.http.post<Product>(this.productsUrl, product, { headers })
            .pipe(
                tap(data => console.log('createProduct: ' + JSON.stringify(data))),
                catchError(this.handleError)
            );
    }

    deleteProduct(id: number): Observable<{}> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url = `${this.productsUrl}/${id}`;
        return this.http.delete<Product>(url, { headers })
          .pipe(
            tap(data => console.log('deleteProduct: ' + id)),
            catchError(this.handleError)
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

    private initializeProduct(): Product {
        // Return an initialized object
        return {
            "id": 0,
            "productName": "",
            "productCode": "",
            "tags": [''],
            "releaseDate": "",
            "price": 0,
            "description": "",
            "starRating": 0,
            "imageUrl": ""
        };
    }
}