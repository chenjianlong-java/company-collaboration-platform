import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DropDirective} from './drop-drag/drop.directive';
import {DragDirective} from './drop-drag/drag.directive';

@NgModule({
    declarations: [DragDirective, DropDirective],
    exports: [
        DragDirective,
        DropDirective
    ],
    imports: [],
})
export class DirectiveModule {
}
