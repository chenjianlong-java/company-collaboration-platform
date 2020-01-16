import {Component, OnInit} from '@angular/core';

export interface Tile {
    color: string;
    cols: number;
    rows: number;
    text: string;
}

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    items: string[];
    tiles: Tile[] = [
        {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
        {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
        {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
        {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    ];
    
    constructor() {
    }
    
    ngOnInit() {
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 10, 11, 12, 13, 14, 15, 16];
        this.items = nums.map(d => `avatars:svg-${d}`);
    }
}
