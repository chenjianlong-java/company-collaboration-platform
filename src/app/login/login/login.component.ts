import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {QuoteService} from '../../services';
import {Quote} from '../../domain/quote.model';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	
	form: FormGroup;
	quote: Quote = {
		'id': '0',
		'cn': '我突然就觉得自己像个华丽的木偶,演尽了所有的悲欢离合,可是背上总是有无数闪亮的银色丝线,操纵我哪怕一举手一投足。',
		'en': 'I suddenly feel myself like a doll,acting all kinds of joys and sorrows.There are lots of shining silvery thread on my back,controlling all my action.',
		'pic': ''
	};
	
	PI = 3.14159265358979324
	x_pi = this.PI * 3000.0 / 180.0;
	
	constructor(private fb: FormBuilder,
	            private quoteSV: QuoteService
	) {
		this.quoteSV.getQuote().subscribe(r => this.quote = r);
	}
	
	
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
		this.form.controls['email'].setValidators(this.validate);
	}
	
	validate(c: FormControl): { [key: string]: any } {
		if (!c.valid) return null;
		const pattern = /^wang+/;
		if (pattern.test(c.value)) return null;
		return {emailNotValid: 'The email must start width wang'};
	}
}
