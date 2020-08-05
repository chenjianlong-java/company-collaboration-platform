import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../domain/user.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
    selector: 'app-project-invite',
    templateUrl: './project-invite.component.html',
    styleUrls: ['./project-invite.component.scss']
})
export class ProjectInviteComponent implements OnInit {
    
    members: User[] = [];
    dialogTitle: string;
    
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<ProjectInviteComponent>) {
    }
    
    ngOnInit() {
        console.log("获取到值", this.data);
        this.members = [...this.data.members];
        this.dialogTitle = this.data.dialogTitle ? this.data.dialogTitle : '邀请成员';
    }
    
    onSubmit(ev: Event, {value, valid}) {
        ev.preventDefault();
        if (!valid) {
            return;
        }
        this.dialogRef.close(this.members);
    }
}
