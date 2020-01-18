import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {ProjectListComponent} from './project-list/project-list.component';
import {ProjectItemComponent} from './project-item/project-item.component';
import {NewProjectComponent} from './new-project/new-project.component';
import {MatAutocompleteModule, MatButtonModule, MatCardModule, MatDialogModule, MatIconModule} from '@angular/material';
import {ProjectRoutingModule} from './project-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {ProjectInviteComponent} from './project-invite/project-invite.component';


@NgModule({
    declarations: [ProjectListComponent, ProjectItemComponent, NewProjectComponent, ProjectInviteComponent],
    imports: [
        SharedModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        ProjectRoutingModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatAutocompleteModule
    ],
    entryComponents: [NewProjectComponent, ProjectInviteComponent],
    
})
export class ProjectModule {
}
