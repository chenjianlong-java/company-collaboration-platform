import {NgModule} from '@angular/core';
import {DropDirective} from './drop-drag/drop.directive';
import {DragDirective} from './drop-drag/drag.directive';
import {DragDropService} from './drag-drop.service';

@NgModule({
    declarations: [DragDirective, DropDirective],
    exports: [
        DragDirective,
        DropDirective
    ],
    imports: [],
    providers: [DragDropService]
})
export class DirectiveModule {
}
