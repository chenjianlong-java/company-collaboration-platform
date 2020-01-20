import {Component, EventEmitter, HostBinding, HostListener, Input, OnInit, Output} from '@angular/core';
import {cardAdnim} from '../../anims/card.anim';

@Component({
    selector: 'app-project-item',
    templateUrl: './project-item.component.html',
    styleUrls: ['./project-item.component.scss'],
    animations: [cardAdnim]
})
export class ProjectItemComponent implements OnInit {
    
    @Input() item;
    @Output() onInvite = new EventEmitter<void>();
    @Output() onEdit = new EventEmitter<void>();
    @Output() onDel = new EventEmitter<void>();
    @HostBinding('@card') cardState = 'out';
    
    constructor() {
    }
    
    ngOnInit() {
    }
    
    @HostListener('mouseenter')
    onMouseEnter() {
        this.cardState = 'hover';
    }
    
    @HostListener('mouseleave')
    onMouseLeave() {
        this.cardState = 'out';
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
