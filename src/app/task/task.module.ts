import {NgModule} from '@angular/core';
import {TaskRoutingModule} from './task-routing.module';
import {TaskHomeComponent} from './task-home/task-home.component';
import {TaskListComponent} from './task-list/task-list.component';
import {TaskItemComponent} from './task-item/task-item.component';
import {TaskHeaderComponent} from './task-header/task-header.component';
import {SharedModule} from '../shared/shared.module';
import {
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatMenuModule,
    MatRadioModule,
    MatTooltipModule,
    MatNativeDateModule, MatSelectModule
} from '@angular/material';
import {NewTaskComponent} from './new-task/new-task.component';
import {CopyTaskComponent} from './copy-task/copy-task.component';
import {NewTaskListComponent} from './new-task-list/new-task-list.component';
import { QuickTaskComponent } from './quick-task/quick-task.component';


@NgModule({
    declarations: [TaskHomeComponent, TaskListComponent, TaskItemComponent, TaskHeaderComponent, NewTaskComponent, CopyTaskComponent, NewTaskListComponent, QuickTaskComponent],
    imports: [
        TaskRoutingModule,
        SharedModule,
        MatMenuModule,
        MatCheckboxModule,
        MatTooltipModule,
        MatDialogModule,
        MatRadioModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
    ],
    entryComponents: [NewTaskComponent, CopyTaskComponent, NewTaskListComponent]
})
export class TaskModule {
}
