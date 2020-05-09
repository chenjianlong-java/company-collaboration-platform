import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatToolbarModule,
    MatGridListModule, MatDialogModule, MatDatepickerModule, MatButtonToggleModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {DirectiveModule} from '../directive/directive.module';
import 'rxjs/operators';
import { ImageListSelectComponent } from './image-list-select/image-list-select.component';
import { DateInputComponent } from './date-input/date-input.component';


/**
 * @Description: 主要目的是把程序都需要的一些东西导入进来在导出出去,这样有哪里需要比如commonModule的话直接引入这个sharedModule就可以了
 *               以后大家共享的组件也可以放在这里
 */
@NgModule({
    declarations: [ConfirmDialogComponent, ImageListSelectComponent, DateInputComponent],
    entryComponents: [ConfirmDialogComponent],
    imports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatListModule,
        MatSlideToggleModule,
        MatGridListModule,
        FormsModule,
        ReactiveFormsModule,
        MatDialogModule,
        DirectiveModule,
        MatDatepickerModule,
        MatButtonToggleModule,
    ],
    exports: [
        CommonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatListModule,
        MatSlideToggleModule,
        MatGridListModule,
        FormsModule,
        ReactiveFormsModule,
        DirectiveModule,
        ImageListSelectComponent,
        DateInputComponent,
    ],
})
export class SharedModule {
}
