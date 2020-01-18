import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-task-header',
    templateUrl: './task-header.component.html',
    styleUrls: ['./task-header.component.scss']
})
export class TaskHeaderComponent implements OnInit {
    @Input() header = '';
    @Output() newTask = new EventEmitter<void>();
    @Output() moveAll = new EventEmitter<void>();
    @Output() delList = new EventEmitter<void>();
    @Output() onEditList = new EventEmitter<void>();
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    addNewTask($event: MouseEvent) {
        this.newTask.emit();
    }
    
    onChangeListName($event: MouseEvent) {
        this.onEditList.emit();
    }
    
    onMoveAllTasks($event: MouseEvent) {
        this.moveAll.emit();
    }
    
    onDeleteList($event: MouseEvent) {
        this.delList.emit();
    }
}
