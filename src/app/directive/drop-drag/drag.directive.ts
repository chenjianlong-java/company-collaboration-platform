import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
    selector: '[app-draggable][draggedClass]'
})
export class DragDirective {
    
    private _isDraggble = false;
    @Input() draggedClass: string;
    
    constructor(private el: ElementRef, private rd: Renderer2) {
    }
    
    @Input('app-draggable')
    set isDraggable(val: boolean) {
        this._isDraggble = val;
        this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
    }
    
    get isDraggable() {
        return this._isDraggble;
    }
    
    @HostListener('dragstart', [`$event`])
    onDragSart(ev: Event) {
        if (this.el.nativeElement === ev.target) {
            this.rd.addClass(this.el.nativeElement, this.draggedClass);
        }
    }
    
    @HostListener('dragend', ['$event'])
    onDragEnd(ev: Event) {
        if (this.el.nativeElement === ev.target) {
            this.rd.removeClass(this.el.nativeElement, this.draggedClass);
        }
    }
}
