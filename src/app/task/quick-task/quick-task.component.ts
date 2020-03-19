import {Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-quick-task',
    templateUrl: './quick-task.component.html',
    styleUrls: ['./quick-task.component.scss']
})
export class QuickTaskComponent implements OnInit {
    desc: any;
    @Output() quickTask = new EventEmitter();
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    onSubmit({value, valid}, ev: Event) {
        //避免默认刷新网页
        ev.preventDefault();
        console.log(JSON.stringify(value));
        console.log(JSON.stringify(valid));
    }
    
    @HostListener('keyup.enter')
    sendQuickTask() {
        if (!this.desc || this.desc.length === 0 || !this.desc.trim()) return;
        
        this.quickTask.emit(this.desc);
        this.desc = '';
    }
}
