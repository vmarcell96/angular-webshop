import { Component, EventEmitter, Input, OnChanges, Output } from "@angular/core";

@Component({
    selector: 'aw-star',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent implements OnChanges {
    //Container component passes rating to this nested component 
    @Input() rating: number = 0;

    cropWidth: number = 75;

    //ratingCLicked is an eventemitter
    @Output() ratingClicked: EventEmitter<string> = 
        new EventEmitter<string>();

    ngOnChanges(): void {
        this.cropWidth = this.rating * 75/5;
    }

    //Passing event to the container component as output
    onClick(): void {
        //using event emitter to emit a string event
        this.ratingClicked.emit(`$The rating was clicked: {this.rating}`);
    }
} 