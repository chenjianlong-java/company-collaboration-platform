import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {debounceTime, filter} from "rxjs/operators";
import {extractInfo, getAddrByCode, isValidAddr} from "../../utils/identity.util";
import {isValidDate} from "../../utils/date.util";
import {Subscription} from "rxjs";

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
    form: FormGroup;
    private readonly avatarName = 'avatars';
    
    tiles: Tile[] = [
        {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
        {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
        {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
        {text: 'Four', cols: 2, rows: 1, color: '#DDBDF1'},
    ];
    selectedTab = 0;
    private _sub: Subscription;
    
    constructor(private fb: FormBuilder) {
    }
    
    ngOnInit() {
        const img = `${this.avatarName}:svg-${Math.floor(Math.random() * 16).toFixed(0)}`;
        const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 10, 11, 12, 13, 14, 15, 16];
        this.items = nums.map(d => `avatars:svg-${d}`);
        this.form = this.fb.group({
            email: [],
            name: [],
            password: [],
            repeat: [],
            avatar: [img],
            dateOfBirth: [''],
            address: ['', Validators.maxLength(80)],
            identity: []
        });
        
        // 452126199602102713
        const id$ = this.form.get('identity').valueChanges.pipe(
            debounceTime(300),
            filter(r => {
                return this.form.get('identity').valid
            }));
        
        this._sub = id$.subscribe(id => {
            const info = extractInfo(id.identityNo);
            if (isValidAddr(info.addrCode)) {
                const addr = getAddrByCode(info.addrCode);
                this.form.patchValue({address: addr});
                this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
            }
            if (isValidDate(info.dateOfBirth)) {
                const date = info.dateOfBirth;
                this.form.patchValue({dateOfBirth: date});
                this.form.updateValueAndValidity({onlySelf: true, emitEvent: true});
            }
        });
    }
    
    onSubmit(form: any, $event: any) {
    }
    
    onTabChange(index: number | ((name: string) => IDBIndex)) {
    }
}
