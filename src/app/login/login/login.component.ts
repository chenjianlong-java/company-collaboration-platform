import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
    form: FormGroup;
    
    constructor(private fb: FormBuilder) { }
    
    ngOnInit() {
        // this.form = new FormGroup({
        //     email: new FormControl('wan@163.com', Validators.compose([Validators.required, Validators.email])),
        //     password: new FormControl('', Validators.required)
        // });
        
        this.form = this.fb.group({
            email: ['wan@lo.com', Validators.compose([Validators.required, Validators.email, this.validate])],
            password: ['', Validators.required]
        });
    }
    
    onSubmit({value, valid}, ev: Event) {
        ev.preventDefault();
        console.log(JSON.stringify(value));
        console.log(JSON.stringify(valid));
        this.form.controls['email'].setValidators(this.validate);
    }
    
    validate(c: FormControl): { [key: string]: any } {
        if (!c.valid) return null;
        const pattern = /^wang+/;
        if (pattern.test(c.value)) return null;
        return {emianNotValid: 'The email must start width wang'};
    }
}
