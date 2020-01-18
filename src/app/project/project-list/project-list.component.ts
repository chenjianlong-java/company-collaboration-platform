import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewProjectComponent} from '../new-project/new-project.component';
import {ProjectInviteComponent} from '../project-invite/project-invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
    
    projects = [
        {
            'name': '企业级开发平台',
            'desc': '这是一个企业内部项目',
            'coverImg': 'assets/img/covers/1.jpg'
        },
        {
            'name': '企业级开发平台',
            'desc': '这是一个企业内部项目',
            'coverImg': 'assets/img/covers/0.jpg'
        }
    ];
    
    constructor(private dialog: MatDialog) {
    }
    
    ngOnInit() {
    }
    
    openNewProjectDialog() {
        const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新增项目'}});
        dialogRef.afterClosed().subscribe(res => {
            console.log(res);
        });
    }
    
    launchInviteDialog() {
        const dialogRef = this.dialog.open(ProjectInviteComponent);
    }
    
    launchUpdateDialg() {
        const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '编辑项目'}});
    }
    
    launchConfirmDailog() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '您确定要删除吗'}});
    }
}