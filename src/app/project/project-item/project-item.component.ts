import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-project-item',
    templateUrl: './project-item.component.html',
    styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit {
    
    @Input() item;
    @Output() onInvite = new EventEmitter<void>();
    @Output() onEdit = new EventEmitter<void>();
    @Output() onDel = new EventEmitter<void>();
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    onClick($event: MouseEvent) {
    }
    
    openUpdateDialog($event: MouseEvent) {
        this.onEdit.emit();
    }
    
    openInviteDialog() {
        this.onInvite.emit();
    }
    
    openDeleteDialog() {
        this.onDel.emit();
    }
}
