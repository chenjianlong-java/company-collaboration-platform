import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {itemAdnim} from '../../anims/item.anim';

@Component({
    selector: 'app-task-item',
    templateUrl: './task-item.component.html',
    styleUrls: ['./task-item.component.scss'],
    animations: [itemAdnim]
})
export class TaskItemComponent implements OnInit {
    @Input() item: any;
    @Input() avatar;
    @Output() taskClick = new EventEmitter<void>();
     widerPriority = 'in';
    
    constructor() {
    }
    
    ngOnInit() {
        this.avatar = this.item.owner ? this.item.owner.avatar : 'unassigned';
    }
    
    @HostListener('mouseenter')
    onMouseEnter() {
        this.widerPriority = 'out';
    }
    
    @HostListener('mouseleave')
    onMouseLeave() {
        this.widerPriority = 'in';
    }
    
    onItemClick() {
        this.taskClick.emit();
    }
    
    onCheckBoxClick($event) {
        $event.stopPropagation();
    }
}
