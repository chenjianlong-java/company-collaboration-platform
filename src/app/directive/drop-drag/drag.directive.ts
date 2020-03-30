import {Directive, ElementRef, HostListener, Input, Renderer2} from '@angular/core';
import {DragDropService} from '../drag-drop.service';

// 参数1：指令名称 定义指令的时候附带输入
// 参数2+：输入型属性
@Directive({
    selector: '[app-draggable][dragTag][draggedClass][dragData]'
})
export class DragDirective {
    
    private _isDraggble = false;
    @Input() draggedClass: string;
    @Input() dragTag: string;
    @Input() dragData: any;
    
    constructor(private el: ElementRef, private rd: Renderer2, private dragAndDropSV: DragDropService) {
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
        if (this.el.nativeElement === ev.target) {  // 确保是元素自身发起的拖拽
            this.rd.addClass(this.el.nativeElement, this.draggedClass);
            this.dragAndDropSV.setDragData({tag: this.dragTag, data: this.dragData});
        }
    }
    
    @HostListener('dragend', ['$event'])
    onDragEnd(ev: Event) {
        if (this.el.nativeElement === ev.target) {
            this.rd.removeClass(this.el.nativeElement, this.draggedClass);
        }
    }
}
