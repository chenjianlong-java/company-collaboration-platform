import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
    selector: '[app-droppable]'
})
export class DropDirective {
    
    @Input() dropEnterClass: string;
    
    constructor(private el: ElementRef, private rd: Renderer2) {
    }
    
    @HostListener('dragenter', [`$event`])
    onDragEnter(ev: Event) {
        if (this.el.nativeElement === ev.target) {
            this.rd.addClass(this.el.nativeElement, this.dropEnterClass);
        }
    }
    
    @HostListener('dragover', ['$event'])
    onDragOver(ev: Event) {
        if (this.el.nativeElement === ev.target) {
        }
    }
    
    @HostListener('dragleave', ['$event'])
    onDragLeave(ev: Event) {
        if (this.el.nativeElement === ev.target) {
            this.rd.removeClass(this.el.nativeElement, this.dropEnterClass);
        }
    }
    
    @HostListener('drop', ['$event'])
    onDrop(ev: Event) {
        if (this.el.nativeElement === ev.target) {
            this.rd.removeClass(this.el.nativeElement, this.dropEnterClass);
        }
    }
}
