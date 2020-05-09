import {Component, forwardRef, Input} from '@angular/core';
import {combineLatest, merge, Subscription} from 'rxjs';
import {ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import {isValidDate, toDate} from '../../utils/date.util';
import {differenceInDays, differenceInMonths, differenceInYears, format, isBefore, parse, subDays, subMonths, subYears} from 'date-fns';
import {debounce, debounceTime, distinct, distinctUntilChanged, filter, map, startWith} from 'rxjs/operators';

export enum AgeUnit {
    Year = 0,
    Month,
    Day
}

export interface Age {
    age: number;
    unit: AgeUnit;
}

@Component({
    selector: 'app-date-input',
    templateUrl: './date-input.component.html',
    styleUrls: ['./date-input.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DateInputComponent),
            multi: true,
        },
        {
            provide: NG_VALIDATORS,
            useExisting: forwardRef(() => DateInputComponent),
            multi: true,
        }
    ],
})
export class DateInputComponent implements ControlValueAccessor {
    
    selectedUnit = AgeUnit.Year;
    form: FormGroup;
    ageUnits = [
        {value: AgeUnit.Year, label: '岁'},
        {value: AgeUnit.Month, label: '月'},
        {value: AgeUnit.Day, label: '天'}
    ];
    dateOfBirth;
    @Input() daysTop = 90;
    @Input() daysBottom = 0;
    @Input() monthsTop = 24;
    @Input() monthsBottom = 1;
    @Input() yearsBottom = 1;
    @Input() yearsTop = 150;
    @Input() debounceTime = 300;
    private subBirth: Subscription;
    private propagateChange = (_: any) => {};
    
    constructor(private fb: FormBuilder) {
        // 初始化日期
        const initBirthday = this.dateOfBirth ? this.dateOfBirth : toDate(subYears(Date.now(), 30));
        const initAgeWidthUnit = this.toAge(initBirthday);
        
        this.form = this.fb.group({
            birthday: [initAgeWidthUnit, this.validateDate],
            age: this.fb.group({
                ageNum: [initAgeWidthUnit.age],
                ageUnit: [initAgeWidthUnit.unit]
            }, {validator: this.validateAge('ageNum', 'ageUnit')})
        });
    }
    
    ngOnInit() {
        
        const birthday = this.form.get('birthday');
        const ageNum = this.form.get('age').get('ageNum');
        const ageUnit = this.form.get('age').get('ageUnit');
        
        const birthday$ = birthday.valueChanges.pipe(
            map(r => {
                console.log('日期控件获取到值:', r);
                return {date: r, from: 'birthday'};
            }),
            debounceTime(this.debounceTime),
            distinctUntilChanged(),
            filter(date => birthday.valid)
        );
        
        
        const ageNum$ = ageNum.valueChanges.pipe(
            startWith(ageNum.value),
            debounceTime(this.debounceTime),
            distinctUntilChanged()
        );
        
        const ageUnit$ = ageUnit.valueChanges.pipe(
            startWith(ageUnit.value),
            debounceTime(this.debounceTime),
            distinctUntilChanged()
        );
        
        const age$ = combineLatest(ageNum$, ageUnit$).pipe(
            distinct(r => r[0]),
            map((r: any) => {
                return {date: r[0] * r[1], from: 'age'};
            }),
            filter(_ => this.form.get('age').valid)
        );
        
        const merged$ = merge(birthday$, age$).pipe(
            filter(_ => this.form.valid),
            // debug('[Age-Input][Merged]:')
        );
        
        this.subBirth = merged$.subscribe((r: any) => {
            let age;
            if (r.date) age = this.toAge(r.date);
            if (r.from === 'birthday') {
                if (age.age === ageNum.value && age.unit === ageUnit.value) {
                    return;
                }
                ageUnit.patchValue(age.unit, {emitEvent: false, emitModelToViewChange: true, emitViewToModelChange: true});
                ageNum.patchValue(age.age, {emitEvent: false});
                this.selectedUnit = age.unit;
                this.propagateChange(r.date);
            } else {
                const ageToCompare = this.toAge(this.form.get('birthday').value);
                if (age.age !== ageToCompare.age || age.unit !== ageToCompare.unit) {
                    this.form.get('birthday').patchValue(r.date, {emitEvent: false});
                    this.propagateChange(r.date);
                }
            }
        });
    }
    
    writeValue(obj: any): void {
        if (obj) {
            this.form.get('birtday').patchValue(format(obj, 'YYYY-MM-DD'));
        }
    }
    
    registerOnChange(fn: any): void {
        throw new Error('Method not implemented.');
    }
    
    registerOnTouched(fn: any): void {
        throw new Error('Method not implemented.');
    }
    
    ngOnDestroy() {
        if (this.subBirth) {
            this.subBirth.unsubscribe();
        }
    }
    
    
    private toAge(dateStr: any): Age {
        
        let date = parse(dateStr, 'yyyy-MM-dd', new Date());
        console.log('日期:', date, dateStr);
        // date = toD(dateStr);
        // const date = new Date();
        const now = new Date();
        if (isBefore(subDays(now, this.daysTop), date)) {
            return {
                age: differenceInDays(now, date),
                unit: AgeUnit.Day
            };
        } else if (isBefore(subMonths(now, this.monthsTop), date)) {
            return {
                age: differenceInMonths(now, date),
                unit: AgeUnit.Month
            };
        } else {
            return {
                age: differenceInYears(now, date),
                unit: AgeUnit.Year
            };
        }
    }
    
    private toDate(age: Age): string {
        const now = new Date();
        switch (age.unit) {
            case AgeUnit.Year: {
                return toDate(subYears(now, age.age));
            }
            case AgeUnit.Month: {
                return toDate(subMonths(now, age.age));
            }
            case AgeUnit.Day: {
                return toDate(subDays(now, age.age));
            }
            default: {
                return this.dateOfBirth;
            }
        }
    }
    
    validateDate(c: FormControl): { [key: string]: any } {
        const val = c.value;
        return isValidDate(val) ? null : {
            birthday: true
        };
    }
    
    validate(c: FormControl): { [key: string]: any } {
        const val = c.value;
        return isValidDate(val) ? null : {
            dataOfBirthInvalid: true
        };
    }
    
    validateAge(ageNumKey: string, ageUnitKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            const ageNum = group.controls[ageNumKey];
            const ageUnit = group.controls[ageUnitKey];
            let result = false;
            const ageNumVal = ageNum.value;
            
            switch (ageUnit.value) {
                case AgeUnit.Year: {
                    result = ageNumVal >= this.yearsBottom && ageNumVal <= this.yearsTop;
                    break;
                }
                case AgeUnit.Month: {
                    result = ageNumVal >= this.monthsBottom && ageNumVal <= this.monthsTop;
                    break;
                }
                case AgeUnit.Day: {
                    result = ageNumVal >= this.daysBottom && ageNumVal <= this.daysTop;
                    break;
                }
                default: {
                    result = false;
                    break;
                }
            }
            return result ? null : {
                ageInvalid: true
            };
        };
    }
}
