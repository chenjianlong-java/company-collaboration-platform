import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
    selector: 'app-project-invite',
    templateUrl: './project-invite.component.html',
    styleUrls: ['./project-invite.component.scss']
})
export class ProjectInviteComponent implements OnInit {
    
    items = [
        {
            id: 1,
            name: 'zhangsan'
        },
        {
            id: 2,
            name: 'wangwu'
        },
        {
            id: 3,
            name: 'lisi'
        }
    ];
    
    myControl = new FormControl();
    options: string[] = ['One', 'Two', 'Three'];
    filteredOptions: Observable<string[]>;
    
    constructor() {
    }
    
    
    ngOnInit() {
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value))
        );
    }
    
    private _filter(value: string): string[] {
        const filterValue = value.toLowerCase();
        return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
    }
    
}
