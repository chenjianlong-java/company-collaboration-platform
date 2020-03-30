import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewProjectComponent} from '../new-project/new-project.component';
import {ProjectInviteComponent} from '../project-invite/project-invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-project-list',
    templateUrl: './project-list.component.html',
    styleUrls: ['./project-list.component.scss'],
    animations: [
        trigger('square', [
            state('green', style({'background-color': 'green', 'height': '100px', 'transform': 'translateY(-10%)'})),
            state('red', style({'background-color': 'red', 'height': '300px', 'transform': 'translateY(10%)'})),
            transition('green => red', animate('800ms cubic-bezier(.71,1.63,0,1.03)')),
            // transition('red => green', animate('800ms cubic-bezier(.71,1.63,0,1.03)'))
            transition('red => green', animate(5000,keyframes([
                style({transform:'translateY(100px)'}),
                style({transform:'translateY(10px)'}),
                style({transform:'translateY(100px)'}),
                style({transform:'translateY(50px)'}),
                style({transform:'translateY(200px)'}),
                style({transform:'translateY(150px)'}),
                style({transform:'translateY(10px)'}),
            ])))
        ])
    ]
})
export class ProjectListComponent implements OnInit {
    
    projects = [
        {
            id: 1,
            name: '企业级开发平台',
            desc: '这是一个企业内部项目',
            coverImg: 'assets/img/covers/1.jpg'
        },
        {
            id: 2,
            name: '企业级开发平台',
            desc: '这是一个企业内部项目',
            coverImg: 'assets/img/covers/0.jpg'
        }
    ];
    private state: string = 'red';
    
    constructor(private dialog: MatDialog) {
    }
    
    ngOnInit() {
    }
    
    openNewProjectDialog() {
        const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '新增项目'}});
        dialogRef.afterClosed().subscribe(res => {
            this.projects = [...this.projects,
                {id: 3, name: '又是一个新项目', desc: '这是一个新项目', coverImg: ' assets/img/covers/8.jpg'},
                {id: 4, name: '又是一个新项目2', desc: '这是一个新项目', coverImg: ' assets/img/covers/9.jpg'}
            ];
        });
    }
    
    launchInviteDialog() {
        const dialogRef = this.dialog.open(ProjectInviteComponent);
    }
    
    launchUpdateDialg() {
        const dialogRef = this.dialog.open(NewProjectComponent, {data: {title: '编辑项目'}});
    }
    
    launchConfirmDailog(project) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '您确定要删除吗'}});
        dialogRef.afterClosed().subscribe(res => {
            this.projects = this.projects.filter(p => p.id !== project.id);
        });
    }
    
    changShape() {
        this.state = this.state == 'red' ? 'green' : 'red';
        console.log(this.state);
    }
}
