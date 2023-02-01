import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/types/product";


@Component({
    selector: 'aw-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit, OnDestroy {
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = true;
    errorMessage: string = '';
    sub!: Subscription;

    private _listFilter: string = '';
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    filteredProducts: Product[] = [];
    products: Product[] = [];

    constructor(private productService: ProductService) {

    }
    


    ngOnInit(): void {
        this.sub = this.productService.getProducts().subscribe({
            //http requests only emit one time(the whole array at once)
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err
        });
        
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    

    

    performFilter(filterBy: string): Product[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: Product) => 
            product.productName.toLocaleLowerCase().includes(filterBy)
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    onRatingClicked(message: string): void {
        this.pageTitle = 'Product List: ' + message;
    }
    
}