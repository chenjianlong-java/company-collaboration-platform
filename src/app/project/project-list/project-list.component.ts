import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewProjectComponent} from '../new-project/new-project.component';
import {ProjectInviteComponent} from '../project-invite/project-invite.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {ProjectService} from "../../services/project.service";
import * as _ from 'lodash';
import {listAnimation} from "../../anims/list.anim";
import {filter, map, switchMap, take} from "rxjs/operators";
import {Project} from "../../domain/project.model";
import {Subscription} from "rxjs";

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
            transition('red => green', animate(5000, keyframes([
                style({transform: 'translateY(100px)'}),
                style({transform: 'translateY(10px)'}),
                style({transform: 'translateY(100px)'}),
                style({transform: 'translateY(50px)'}),
                style({transform: 'translateY(200px)'}),
                style({transform: 'translateY(150px)'}),
                style({transform: 'translateY(10px)'}),
            ])))
        ]),
        listAnimation
    ]
})
export class ProjectListComponent implements OnInit, OnDestroy {
    
    
    projects = [];
    sub: Subscription;
    private state: string = 'red';
    
    ngOnDestroy(): void {
        if (this.sub) this.sub.unsubscribe();
    }
    
    constructor(private dialog: MatDialog, private projectSV: ProjectService) {
    
    }
    
    ngOnInit() {
        this.sub = this.projectSV.get("37").subscribe(projects => this.projects = projects);
    }
    
    openNewProjectDialog() {
        const selectedImg = `/assets/img/covers/${Math.floor(Math.random() * 40)}_tn.jpg`;
        const dialogRef = this.dialog.open(NewProjectComponent, {
            data: {
                title: '新增项目',
                thumbnails: this.getThumbnains(),
                img: selectedImg
            }
        });
        // filter 确保关闭的时候有值
        dialogRef.afterClosed().pipe(
            take(1),// 只娶一个，自动关闭
            filter(n => n),// n为布尔判断，为true就返回
            map(val => ({...val, coverImg: this.buildImgSrc(val.coverImg)})),
            switchMap(v => this.projectSV.add(v))
        ).subscribe(r => {
            this.projects = [...this.projects, r];
        });
    }
    
    launchInviteDialog() {
        const dialogRef = this.dialog.open(ProjectInviteComponent);
    }
    
    launchUpdateDialg(project: Project) {
        const dialogRef = this.dialog.open(NewProjectComponent, {
            data: {
                thumbnails: this.getThumbnains(),
                project: project
            }
        });
        // filter 确保关闭的时候有值
        dialogRef.afterClosed().pipe(
            take(1),// 只娶一个，自动关闭
            filter(n => n),
            map(val => ({...val, id: project.id, coverImg: this.buildImgSrc(val.coverImg)})),
            switchMap(v => this.projectSV.update(v))
        ).subscribe(r => {
            console.log(this.projects.map(p => p.id));
            // 获取该项目的索引值
            const index = this.projects.map(p => p.id).indexOf(project.id);
            // 赋值新的数组
            this.projects = [...this.projects.slice(0, index), r, ...this.projects.slice(index + 1)];
        })
    }
    
    launchConfirmDailog(project) {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除项目', content: '您确定要删除吗'}});
        // filter 确保关闭的时候有值
        dialogRef.afterClosed().pipe(
            take(1),// 只娶一个，自动关闭
            filter(n => n),
            switchMap(_ => this.projectSV.del(project)),
        ).subscribe(project => {
            this.projects = this.projects.filter(p => p.id != project.id);
        })
    }
    
    changShape() {
        this.state = this.state == 'red' ? 'green' : 'red';
    }
    
    private getThumbnains() {
        return _.range(0, 40).map(i => `/assets/img/covers/${i}_tn.jpg`);
    }
    
    private buildImgSrc(img: string): string {
        return img.indexOf('_') > -1 ? img.split('_')[0] + '.jpg' : img;
    }
}
