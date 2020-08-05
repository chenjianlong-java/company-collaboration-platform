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
    MatGridListModule, MatDialogModule, MatDatepickerModule, MatButtonToggleModule, MatSelect
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ConfirmDialogComponent} from './confirm-dialog/confirm-dialog.component';
import {DirectiveModule} from '../directive/directive.module';
import 'rxjs/operators';
import {ImageListSelectComponent} from './image-list-select/image-list-select.component';
import {DateInputComponent} from './date-input/date-input.component';
import {ChipsListComponent} from './chips-list/chips-list.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {IdentityInputComponent} from './identity-input/identity-input.component';
import {AreaListComponent} from './area-list/area-list.component';
import {MatSelectModule} from "@angular/material/select";
import {MatTabGroup, MatTabsModule} from "@angular/material/tabs";


/**
 * @Description: 主要目的是把程序都需要的一些东西导入进来在导出出去,这样有哪里需要比如commonModule的话直接引入这个sharedModule就可以了
 *               以后大家共享的组件也可以放在这里
 */
@NgModule({
    declarations: [ConfirmDialogComponent, ImageListSelectComponent, DateInputComponent, ChipsListComponent, IdentityInputComponent, AreaListComponent],
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
        MatChipsModule,
        MatAutocompleteModule,
        MatSelectModule,
        MatTabsModule,
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
        MatChipsModule,
        MatAutocompleteModule,
        ChipsListComponent,
        MatSelectModule,
        MatTabsModule,
        AreaListComponent,
        IdentityInputComponent,
    ],
})
export class SharedModule {
}
