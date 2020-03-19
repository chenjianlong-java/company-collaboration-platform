import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {NewTaskComponent} from '../new-task/new-task.component';
import {CopyTaskComponent} from '../copy-task/copy-task.component';
import {ConfirmDialogComponent} from '../../shared/confirm-dialog/confirm-dialog.component';
import {NewTaskListComponent} from '../new-task-list/new-task-list.component';
import {DragData} from '../../directive/drag-drop.service';

@Component({
    selector: 'app-task-home',
    templateUrl: './task-home.component.html',
    styleUrls: ['./task-home.component.scss']
})
export class TaskHomeComponent implements OnInit {
    task: any;
    
    lists = [
        {
            id: 1,
            name: '代办',
            order: 1,
            tasks: [
                {
                    id: 1,
                    desc: '任务一：去星巴克买杯咖啡djfkdjkfjkddkjf',
                    completed: true,
                    priority: 1,
                    owner: {
                        id: 1,
                        name: '张三',
                        avatar: 'avatars:svg-11'
                    },
                    dueDate: new Date(),
                    reminder: new Date()
                },
                {
                    id: 2,
                    desc: '任务2：去星巴克买杯咖啡',
                    completed: true,
                    priority: 2,
                    owner: {
                        id: 1,
                        name: '张四',
                        avatar: 'avatars:svg-11'
                    },
                    dueDate: new Date()
                },
                {
                    id: 3,
                    desc: '任务2：去星巴克买杯咖啡',
                    priority: 3,
                    owner: {
                        id: 1,
                        name: '张四',
                        avatar: 'avatars:svg-11'
                    },
                    dueDate: new Date()
                }
            ]
        },
        {
            id: 2,
            name: '美国全球监听系统',
            order: 2,
            tasks: [
                {
                    id: 1,
                    desc: '任务一：去星巴克买杯咖啡djfkdjkfjkddkjf',
                    completed: true,
                    priority: 1,
                    owner: {
                        id: 1,
                        name: '张三',
                        avatar: 'avatars:svg-11'
                    },
                    dueDate: new Date(),
                    reminder: new Date()
                },
                {
                    id: 2,
                    desc: '任务2：去星巴克买杯咖啡',
                    completed: true,
                    priority: 2,
                    owner: {
                        id: 1,
                        name: '张四',
                        avatar: 'avatars:svg-10'
                    },
                    dueDate: new Date()
                },
                {
                    id: 3,
                    desc: '任务2：去星巴克买杯咖啡',
                    priority: 3,
                    owner: {
                        id: 1,
                        name: '张四',
                        avatar: 'avatars:svg-11'
                    },
                    dueDate: new Date()
                }
            ]
        }
    ];
    
    constructor(private dialog: MatDialog) {
    
    }
    
    ngOnInit() {
    }
    
    launchNewTaskDialog() {
        this.dialog.open(NewTaskComponent, {data: {title: '新建任务'}});
    }
    
    moveAllLaunch() {
        const dialogRef = this.dialog.open(CopyTaskComponent, {data: {lists: this.lists}});
    }
    
    launchUpdateTaskDialog(task) {
        const dialogRef = this.dialog.open(NewTaskComponent, {data: {title: '修改任务', task: task}});
    }
    
    launchConfirmDialog() {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {data: {title: '删除任务列表', content: '您确认删除该任务列表吗?'}});
    }
    
    launchEditListDialog() {
        const dislogRef = this.dialog.open(NewTaskListComponent, {data: {title: '更改列表名称'}});
    }
    
    launchNewListDialog() {
        const dislogRef = this.dialog.open(NewTaskListComponent, {data: {title: '新建列表'}});
    }
    
    handleMove(data, list) {
        console.log(data);
        switch (data.tag) {
            case 'task-item':
                console.log('handling item');
                break;
            case 'task-list':
                console.log('handling list');
                const srcList = data.data;
                const tempOrder = srcList.order;
                srcList.order = list.order;
                list.order = tempOrder;
                break;
            default:
                break;
        }
        
    }
    
    handleQuickTask(ev: Event) {
        console.log(ev);
    }
}
