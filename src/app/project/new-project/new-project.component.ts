import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-new-project',
    templateUrl: './new-project.component.html',
    styleUrls: ['./new-project.component.scss']
})
export class NewProjectComponent implements OnInit {
    form: FormGroup;
    title = '';
    coverImages = [];
    
    constructor(@Inject(MAT_DIALOG_DATA) private data,
                private dialogRef: MatDialogRef<NewProjectComponent>,
                private fb: FormBuilder
    ) {
    }
    
    ngOnInit() {
        this.coverImages = this.data.thumbnails;
        console.log("接收到值", this.data);
        if (this.data.project) {
            this.form = this.fb.group({
                name: [this.data.project.name, Validators.required],
                desc: [this.data.project.desc],
                coverImg: [this.data.project.coverImg]
            });
            this.title = "修改项目";
        } else {
            this.form = this.fb.group({
                name: ['', Validators.required],
                desc: [],
                coverImg: [this.data.img]
            });
            this.title = "创建项目";
        }
    }
    
    onClick() {
        this.dialogRef.close('I received your message');
    }
    
    onSubmit({value, valid}, event: Event) {
        event.preventDefault();
        if (!valid) return;
        this.dialogRef.close({name: value.name, desc: value.desc ? value.desc : null, coverImg: value.coverImg});
    }
}
