import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectItemComponent} from './project-item/project-item.component';
import {NewProjectComponent} from './new-project/new-project.component';
import {InviteComponent} from './invite/invite.component';
import {MatButtonModule, MatCardModule, MatDialogModule, MatIconModule} from '@angular/material';
import {ProjectRoutingModule} from './project-routing.module';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
    declarations: [ProjectListComponent, ProjectItemComponent, NewProjectComponent, InviteComponent],
    imports: [
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        ProjectRoutingModule,
        MatDialogModule,
        ReactiveFormsModule
    ],
    entryComponents: [NewProjectComponent, InviteComponent],
    
})
export class ProjectModule {
}
